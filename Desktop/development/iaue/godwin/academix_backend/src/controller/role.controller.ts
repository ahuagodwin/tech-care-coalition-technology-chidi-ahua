import { Request, Response } from "express";
import { IRole, IRoute, IUser } from "../types/types";
import Role from "../models/role.model";
import { User } from "../models/user.model";
import mongoose, { Types } from "mongoose";
import { isSystemOwner } from "../middlewares/isSystemOwner";

interface AuthenticatedRequest extends Request {
    user?: IUser;
}

export const createRole = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const session = await mongoose.startSession(); 
    session.startTransaction();

    try {
        const { name, description, permissions, routes } = req.body;
        const userId = req.user?._id;

        if (!userId) {
            res.status(401).json({ error: "Unauthorized access", status: false });
            return;
        }

        // Ensure roles are populated before checking permissions
        const user = await User.findById(userId).populate<{ roles: IRole[] }>("roles").session(session);

        if (!user) {
            res.status(404).json({ error: "User not found", status: false });
            await session.abortTransaction();
            session.endSession();
            return;
        }

        // Check user permissions
        const hasPermission = user.roles.some((role) => role.permissions.includes("create"));
        if (!hasPermission) {
            res.status(403).json({ error: "Unauthorized to create roles", status: false });
            await session.abortTransaction();
            session.endSession();
            return;
        }

        // Check if role already exists
        const existingRole = await Role.findOne({ name }).session(session);
        if (existingRole) {
            res.status(409).json({ error: "Role already exists", status: false });
            await session.abortTransaction();
            session.endSession();
            return;
        }

        // Create and save the new role
        const newRole = new Role({ name, description, permissions, routes });
        await newRole.save({ session });

        // Commit transaction
        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ message: `${name} Role created successfully`, role: newRole, status: true });
    } catch (error) {
        console.error(error);
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ error: "Internal server error", status: false });
    }
};


/**
 * @desc Get all roles (Only users with "read" permission)
 * @route GET /api/roles
 * @access Private
 */
export const getAllRoles = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;

        if (!userId || !(await isSystemOwner(userId))) {
            res.status(401).json({ error: "Unauthorized access", status: false });
            return;
        }

        const user = await User.findById(userId).populate<{ roles: IRole[] }>("roles");
        if (!user) {
            res.status(404).json({ error: "User not found", status: false });
            return;
        }

        // Check if the user has "read" permission
        const hasPermission = user.roles.some((role) => role.permissions.includes("read"));
        if (!hasPermission) {
            res.status(403).json({ error: "Unauthorized to view roles", status: false });
            return;
        }

        const roles = await Role.find();
        res.status(200).json({ roles, status: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", status: false });
    }
};

/**
 * @desc Get a single role by ID (Only users with "read" permission)
 * @route GET /api/roles/:roleId/
 * @access Private
 */
export const getRoleById = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { roleId } = req.params;
        const userId = req.user?._id;

        if (!userId || !(await isSystemOwner(userId))) {
            res.status(401).json({ error: "Unauthorized access", status: false });
            return;
        }

        const user = await User.findById(userId).populate<{ roles: IRole[] }>("roles");
        if (!user) {
            res.status(404).json({ error: "User not found", status: false });
            return;
        }

        // Check if the user has "read" permission
        const hasPermission = user.roles.some((role) => role.permissions.includes("read"));
        if (!hasPermission) {
            res.status(403).json({ error: "Unauthorized to view role", status: false });
            return;
        }

        if (!mongoose.Types.ObjectId.isValid(roleId)) {
            res.status(400).json({ error: "Invalid role ID", status: false });
            return;
        }

        const role = await Role.findById(roleId);
        if (!role) {
            res.status(404).json({ error: "Role not found", status: false });
            return;
        }

        res.status(200).json({ role, status: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", status: false });
    }
};

/**
 * @desc Update a role by ID (Only users with "update" permission)
 * @route PUT /api/roles/:roleId
 * @access Private
 */
export const updateRoleById = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { roleId } = req.params;
        const { name, description, permissions, routes } = req.body;
        const userId = req.user?._id;

        console.log("Received roleId:", roleId);

        if (!userId || !(await isSystemOwner(userId))) {
            res.status(401).json({ error: "Unauthorized access", status: false });
            return;
        }

        const user = await User.findById(userId).populate<{ roles: IRole[] }>("roles");
        if (!user) {
            res.status(404).json({ error: "User not found", status: false });
            return;
        }

        const roleExists = await Role.findById(roleId);
        console.log("Role found:", roleExists);

        // Check if the user has "update" permission
        const hasPermission = user.roles.some((role) => role.permissions.includes("update"));
        if (!hasPermission) {
            res.status(403).json({ error: "Unauthorized to update role", status: false });
            return;
        }

        if (!mongoose.Types.ObjectId.isValid(roleId)) {
            res.status(400).json({ error: "Invalid role ID", status: false });
            return;
        }

        const updatedRole = await Role.findByIdAndUpdate(
            roleId,
            { name, description, permissions, routes },
            { new: true, runValidators: true, session }
        );

        if (!updatedRole) {
            res.status(404).json({ error: "Role not found", status: false });
            return;
        }

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: "Role updated successfully", role: updatedRole, status: true });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error(error);
        res.status(500).json({ error: "Internal server error", status: false });
    }
};

/**
 * @desc Delete a role by ID (Only users with "delete" permission)
 * @route DELETE /api/roles/roleId
 * @access Private
 */
export const deleteRoleById = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { roleId } = req.params;
        const userId = req.user?._id;

        if (!userId || !(await isSystemOwner(userId))) {
            res.status(401).json({ error: "Unauthorized access", status: false });
            return;
        }

        const user = await User.findById(userId).populate<{ roles: IRole[] }>("roles");
        if (!user) {
            res.status(404).json({ error: "User not found", status: false });
            return;
        }

        // Check if the user has "delete" permission
        const hasPermission = user.roles.some((role) => role.permissions.includes("delete"));
        if (!hasPermission) {
            res.status(403).json({ error: "Unauthorized to delete role", status: false });
            return;
        }

        if (!mongoose.Types.ObjectId.isValid(roleId)) {
            res.status(400).json({ error: "Invalid role ID", status: false });
            return;
        }

        const deletedRole = await Role.findByIdAndDelete(roleId, { session });
        if (!deletedRole) {
            res.status(404).json({ error: "Role not found", status: false });
            return;
        }

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: "Role deleted successfully", status: true });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error(error);
        res.status(500).json({ error: "Internal server error", status: false });
    }
};



export const assignRolesToUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { userId, roleIds } = req.body;
        const requestingUserId = req.user?._id;

        if (!requestingUserId) {
            res.status(401).json({ error: "Unauthorized access", status: false });
            return;
        }

        if (!userId || !roleIds || !Array.isArray(roleIds)) {
            res.status(400).json({ error: "Invalid input. Provide userId and an array of roleIds.", status: false });
            return;
        }

        //  Fetch requesting user & validate permissions
        const requestingUser = await User.findById(requestingUserId).populate<{ roles: IRole[] }>("roles").session(session);
        if (!requestingUser) {
            res.status(404).json({ error: "Requesting user not found", status: false });
            await session.abortTransaction();
            session.endSession();
            return;
        }

        const hasPermission = requestingUser.roles.some((role) => role.permissions.includes("create"));
        if (!hasPermission) {
            res.status(403).json({ error: "You do not have permission to assign roles", status: false });
            await session.abortTransaction();
            session.endSession();
            return;
        }

        // Fetch target user
        const targetUser = await User.findById(userId).session(session);
        if (!targetUser) {
            res.status(404).json({ error: "Target user not found", status: false });
            await session.abortTransaction();
            session.endSession();
            return;
        }

        // Validate roles
        const roles = await Role.find({ roleId: { $in: roleIds } }).session(session);
        if (roles.length !== roleIds.length) {
            res.status(404).json({ error: "One or more roles not found", status: false });
            await session.abortTransaction();
            session.endSession();
            return;
        }

        // Ensure `targetUser.roles` is an array of ObjectId
        const existingRoleIds = new Set((targetUser.roles as Types.ObjectId[]).map((role) => role.toString()));
        const newRoleIds = roleIds.filter((roleId: string) => !existingRoleIds.has(roleId));

        if (newRoleIds.length === 0) {
            res.status(400).json({ error: "User already has these roles assigned", status: false });
            await session.abortTransaction();
            session.endSession();
            return;
        }

        // Add new roles to user
        targetUser.roles = [...(targetUser.roles as Types.ObjectId[]), ...newRoleIds.map((id) => new mongoose.Types.ObjectId(id))];
        await targetUser.save({ session });

        // Commit transaction
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            message: "Roles assigned successfully",
            user: {
                userId: targetUser._id,
                roles: targetUser.roles
            },
            status: true
        });

    } catch (error) {
        console.error(error);
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ error: "Internal server error", status: false });
    }
};

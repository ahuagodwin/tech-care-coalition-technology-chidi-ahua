import { authorize, authProtect } from "../middlewares/authorized.md";
import * as roleService from "../controller/role.controller";
import { Router } from "express";

const roleRouter = Router();

// AUTHENTICATION routes
roleRouter.post("/create/", authProtect, authorize("System Owner"), roleService.createRole);
roleRouter.put("/update/:roleId/", authProtect, authorize("System Owner"), roleService.updateRoleById);
roleRouter.delete("/delete/:roleId/", authProtect, authorize("System Owner"), roleService.deleteRoleById);
roleRouter.get("/all", authProtect, authorize("System Owner", "Administrator"), roleService.getAllRoles);
roleRouter.get("/:roleId", authProtect, authorize("System Owner", "Administrator"), roleService.getRoleById);
roleRouter.post("/assign/", authProtect, authorize("System Owner", "administrator"), roleService.assignRolesToUser);

export { roleRouter };

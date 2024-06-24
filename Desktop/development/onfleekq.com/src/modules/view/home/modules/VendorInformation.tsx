import { Button } from "@/components";
import { onfleekQ } from "@/config/config";
import { ImgIcon } from "@/constants/Images_Icon";
import { onfkQ } from "@/styles";

const VendorInformation = () => {
  return (
    <onfkQ.Container>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-16 my-28">
        <section className="vendor_img">
            <p className="tags">Vendor <span id="id">Information</span></p>
          <img src={ImgIcon.VendorInformationImg} alt={onfleekQ.company.name} />
        </section>
        <section className="vendor_content">
          <p className="tags">Vendor <span id="id">Information</span></p>
          <p className="desc">
            Unlock new opportunities by becoming a vendor on our platform!
            Showcase your beauty services or products to a wider audience and
            grow your business with ease. 
            
            <br /> <br />
            As a vendor, you will enjoy benefits
            like increased visibility, access to a larger customer base, and
            seamless booking management. Join our platform today and take your
            beauty business to the next level!
          </p>

          <Button label="Become a Vendor" type="onfkq_primary" />
        </section>
      </div>
    </onfkQ.Container>
  );
};

export default VendorInformation;

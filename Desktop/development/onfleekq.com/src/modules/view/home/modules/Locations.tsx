import { HeaderStroke } from "@/components/common";
import { onfleekQ } from "@/config/config";
import { businessLocation } from "@/data/location.data";

const Locations = () => {
  return (
    <div
      className="home_service py-3 clear-both"
      style={{ background: `var(--colorWhite)` }}
    >
      <HeaderStroke
        title="Available Location"
        label="We are available in the following cities"
        size="text-[42px] sm:text-[42px] md:text-[70px] lg:text-[140px]"
        fontSize="text-[40px] sm:text-[30px] md:text-[40px] lg:text-[60px] leading-[40px] -mt-[28px] sm:-mt-[28px] md:-mt-[35px] -mt-24"
      />

      <div className="onfleekq_container mt-16 mb-24">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
          {businessLocation.map((item, index) => {
            const isLastSingleItem = businessLocation.length % 2 !== 0 && index === businessLocation.length - 1;

            return (
              <section
                className={`w-full sm:w-full md:w-full h-[174.3px] lg:h-[272px] onfleekq_location ${isLastSingleItem ? 'lg:col-span-2' : 'lg:w-full'}`}
                key={index}
              >
                <img src={item?.img} alt={onfleekQ.company.name} />
                <span className="location_name">{item?.title}</span>
                <span className="location_overlay"></span>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Locations;

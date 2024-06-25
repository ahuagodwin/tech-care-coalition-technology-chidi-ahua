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
        size="text-35 sm:text-53 md:text-70 lg:text-140"
        fontSize="text-30 sm:text-30 md:text-40 lg:text-60 leading-[30px] lg:leading-[40px] -mt-[20px] sm:-mt-[28px] md:-mt-[35px] -mt-24"
      />

      <div className="onfleekq_container mt-16 mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
          {businessLocation.map((item, index) => {
            const isLastSingleItem = businessLocation.length % 2 !== 0 && index === businessLocation.length - 1;

            return (
              <section
                className={`w-full sm:w-full md:w-full h-[174.3px] lg:h-[272px] onfleekq_location ${isLastSingleItem ? 'lg:col-span-2' : 'lg:w-full'}`}
                key={index}
              >
                <img src={item?.img} alt={onfleekQ.company.name} />
                <span className="location_name text-30 md:text-40 lg:text-60">{item?.title}</span>
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

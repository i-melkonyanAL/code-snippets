import IconClock from "@/assets/icons/clock.svg";
import IconSearch from "@/assets/icons/search.svg";
import Toggle from "@/components/reusable/toggle";

const toggleBtn1 = {
  icon: <IconSearch />,
  id: "search",
};

const toggleBtn2 = {
  icon: <IconClock />,
  id: "clock",
};

function ToggleView() {
  return (
    <Toggle
      btn1={toggleBtn1}
      btn2={toggleBtn2}
      handleChange={async (id) => {
        "use server";
      }}
    />
  );
}

export default ToggleView;

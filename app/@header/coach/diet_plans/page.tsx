import IconPlus from "@/assets/icons/plus.svg";
import IconSearch from "@/assets/icons/search.svg";
import Button from "@/components/reusable/button";
import Header from "@/layouts/auth_layout/header";
import ToggleView from "./toggle-view";

function ParallelHeader() {
  return (
    <Header title="Nutrition plans">
      <ToggleView />
      <Button withIcon icon={<IconPlus />}>
        Add Nutrition Plan
      </Button>
      <Button withIcon icon={<IconSearch />}>
        Search
      </Button>
    </Header>
  );
}

export default ParallelHeader;

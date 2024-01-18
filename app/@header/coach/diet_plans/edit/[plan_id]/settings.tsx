"use client";

import Button from "@/components/reusable/button";
import IconSetting from "@/assets/icons/setting.svg";
import { useEffect, useState } from "react";
import Modal from "@/components/reusable/modal";
import Checkbox from "@/components/reusable/checkbox";
import { useForm } from "react-hook-form";
import { useDietSingle } from "@/api/diet_plans";
import { useQueryClient } from "@tanstack/react-query";
import { GET_DIET_PLAN_BY_ID } from "@/api/query_keys";
import { ISingleDietData } from "@/api/diet_plans/type";
import { useParams } from "next/navigation";

const MICRO_ENABLERS = ["fats", "carbs", "protein", "calories"];

const getIsMicroACtive = (values: string[] | undefined) =>
  MICRO_ENABLERS.every((value) => values?.includes(value));

const ALL_SETTINGS = [
  { label: "Calories", value: "calories" },
  { label: "Protein", value: "protein" },
  { label: "Fats", value: "fats" },
  { label: "Carbs", value: "carbs" },
  { label: "Summary Panel", value: "sumary" },
];

function Settings() {
  const { data } = useDietSingle();

  const { watch, setValue } = useForm({
    defaultValues: { settings: data?.settings },
  });
  const params = useParams<{plan_id: string}>();
  const [isOpenModal, setModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: newValue } = e.target;
    if (values) {
      const copyValues = [...values];
      if (values.includes(newValue)) {
        copyValues.splice(copyValues.indexOf(newValue), 1);
      } else {
        copyValues.push(newValue);
      }
      if (MICRO_ENABLERS.includes(newValue)) {
        const isMicroActive = getIsMicroACtive(copyValues);
        const isMicroIncluded = copyValues.includes("micronutrients");
        if (isMicroActive) {
          if (!isMicroIncluded) {
            copyValues.push("micronutrients");
          }
        } else {
          if (isMicroIncluded) {
            copyValues.splice(copyValues.indexOf("micronutrients"), 1);
          }
        }
      }

      setValue("settings", copyValues);
    }
  };

  const values = watch("settings");

  const handleSubmit = () => {
    queryClient.setQueryData<ISingleDietData>(
      GET_DIET_PLAN_BY_ID(params.plan_id),
      (prevValue) => {
        if (prevValue && values) {
          return { ...prevValue, settings: values };
        }
        return prevValue;
      },
    );
    
    handleCloseModal();
  };

  const isMicroActive = getIsMicroACtive(values);

  return (
    <>
      <Button onClick={handleOpenModal} type="button">
        <IconSetting />
      </Button>
      <Modal isOpen={isOpenModal} onClose={handleCloseModal}>
        <Modal.Header>Fields Setting</Modal.Header>
        <Modal.Body>
          <div>
            <div className="px-4 py-2 bg-gray500 rounded-xl mb-4">
              Choose which fields you want your clients to see when viewing
              their nutrition plan
            </div>
            <div>
              <span>Show/hide maccros</span>
              <div className="flex flex-col gap-2 mt-2">
                {ALL_SETTINGS.map(({ label, value }) => (
                  <Checkbox
                    key={value}
                    inputProps={{
                      checked: values?.includes(value),
                      value,
                      onChange: handleChangeCheckbox,
                    }}
                  >
                    {label}
                  </Checkbox>
                ))}
                <Checkbox
                  disabled={!isMicroActive}
                  inputProps={{
                    checked: values?.includes("micronutrients"),
                    value: "micronutrients",
                    onChange: handleChangeCheckbox,
                  }}
                >
                  Micronutrients
                </Checkbox>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button secondary active onClick={handleSubmit}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Settings;

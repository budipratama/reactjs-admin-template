import BasicSelect from "../../components/BasicSelect";
import AdvancedSelect from "../../components/AdvancedSelect";
import { JSX, useState } from "react";

const AutoComplete = (): JSX.Element => {
  const fields = {
    country: "",
    gender: "",
  };
  const [formData, setFormData] = useState<{ [key: string]: string }>(fields);
  const { gender, country } = formData;
  console.log("formData", formData);
  return (
    <div
      style={{
        backgroundColor: "white",
        color: "black",
        padding: "20px",
      }}>
      <h2>Autocomplete</h2>
      <div>
        <h3>Basic</h3>
        <hr />
        <BasicSelect
          name='gender'
          label='Gender'
          value={gender}
          onChange={(val: string) => setFormData({ ...formData, gender: val })}
          errorMessage=''
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" },
          ]}
        />
      </div>

      <div>
        <h3>Advanced</h3>
        <hr />
        <AdvancedSelect
          name='country'
          label='Country'
          value={country}
          onChange={(val: string) => setFormData({ ...formData, country: val })}
          errorMessage=''
          options={[
            { label: "Indonesia", value: "indonesia" },
            { label: "Singapore", value: "singapore" },
            { label: "Malaysia", value: "malaysia" },
          ]}
        />
      </div>
    </div>
  );
};

export default AutoComplete;

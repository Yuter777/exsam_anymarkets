import { PulseLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "auto auto",
  borderColor: "red",
};

const Loader = () => {
  return (
    <PulseLoader
      color={"black"}
      loading={true}
      cssOverride={override}
      size={10}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loader;

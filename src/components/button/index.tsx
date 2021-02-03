import React from "react";
import { Loading } from "../index";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Button } from "./styles";

interface PropsButton {
  title: string;
  handleClick?: () => void;
}

export default ({ title, handleClick }: PropsButton) => {
  const loading = useSelector<RootState>((state) => state.user.loading);

  if (handleClick && typeof handleClick === "function") {
    return (
      <Button onClick={handleClick} type="button">
        {title}
      </Button>
    );
  } else {
    return (
      <>{loading ? <Loading /> : <Button type="submit">{title}</Button>}</>
    );
  }
};

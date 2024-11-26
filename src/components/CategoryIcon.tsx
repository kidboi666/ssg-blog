import HTML from "../assets/icons/html.png";
import CSS from "../assets/icons/css.png";
import JavaScript from "../assets/icons/js.png";
import TypeScript from "../assets/icons/ts.png";
import Astro from "../assets/icons/astro.svg";
import React from "../assets/icons/react.png";
import NextJS from "../assets/icons/next.svg";
import Axios from "../assets/icons/axios.png";
import Web from "../assets/icons/web.png";
import Java from "../assets/icons/java.png";
import Spring from "../assets/icons/spring.png";

interface Props {
  category: keyof typeof categoryIcons;
}

const categoryIcons = {
  HTML,
  CSS,
  JavaScript,
  TypeScript,
  Astro,
  React,
  NextJS,
  Axios,
  Web,
  Java,
  Spring,
};

const CategoryIcon = ({ category }: Props) => {
  const imgSrc = categoryIcons[category];
  return <img width={24} height={24} src={imgSrc.src} className="rounded-md" />;
};

export default CategoryIcon;

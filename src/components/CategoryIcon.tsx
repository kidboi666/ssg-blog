const categoryIcons = {
  NextJS:
    "https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566879300/noticon/fvty9lnsbjol5lq9u3by.svg",
  React:
    "https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566557331/noticon/d5hqar2idkoefh6fjtpu.png",
  JavaScript:
    "https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1570946287/noticon/qgdiv5ctkcneujidjuv1.png",
  TypeScript:
    "https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566913457/noticon/eh4d0dnic4n1neth3fui.png",
  CSS: "https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566912109/noticon/puksfce6wca36hes1vom.png",
  HTML: "https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566995514/noticon/jufppyr8htislboas4ve.png",
  Axios:
    "https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1677561097/noticon/ea5cajzpklxgucnisgy4.png",
  Web: "https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1590043914/noticon/xe5nasyjil6mn6vk8c4s.png",
  Redux:
    "https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1567749614/noticon/zgdaxpaif5ojeduonygb.png",
  Astro: "../../public/icons/astro.svg",
};

interface Props {
  category: keyof typeof categoryIcons;
}

const CategoryIcon = ({ category }: Props) => {
  const imgSrc = categoryIcons[category];
  return <img width={24} height={24} src={imgSrc} className="rounded-md" />;
};

export default CategoryIcon;

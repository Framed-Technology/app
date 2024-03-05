import { Skeleton } from "@chakra-ui/skeleton";

const Loading = () => {
  return (
    <Skeleton
      rounded={"none"}
      w={"full"}
      h={"1000px"}
      shadow={"5px 5px 0 black"}
    />
  );
};

export default Loading;

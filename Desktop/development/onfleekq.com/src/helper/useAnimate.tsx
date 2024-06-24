

const useContentVariants = () => {
  const variants = {
    hidden: {
      opacity: 0,
      height: 0,
      overflow: "hidden",
    },
    visible: {
      opacity: 1,
      height: "auto",
      overflow: "hidden",
      transition: {
        duration: 0.5,
      },
    },
  };

  return { variants };
};

export default useContentVariants;

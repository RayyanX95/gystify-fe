interface Props {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary';
}

export const CircularLoader = ({ size = 'md', color = 'primary' }: Props) => {
  let sizeNumber = 8;
  switch (size) {
    case 'sm': {
      sizeNumber = 6;
      break;
    }
    case 'md': {
      sizeNumber = 8;
      break;
    }
    case 'lg': {
      sizeNumber = 12;
      break;
    }
    default: {
      sizeNumber = 8;
    }
  }

  return (
    <div className="flex justify-center w-fit">
      <div
        className={` h-${sizeNumber} w-${sizeNumber} animate-spin rounded-full border-2 border-gray-200 border-t-primary`}
      />
    </div>
  );
};

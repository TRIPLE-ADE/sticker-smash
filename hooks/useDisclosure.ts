import { useState, useCallback } from 'react';

export const useDisclosure = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible((prev) => !prev);
  }

  return { isVisible, toggleModal };
};

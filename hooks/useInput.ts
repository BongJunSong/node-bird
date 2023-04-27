import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react';

type Handler = (e: ChangeEvent<HTMLTextAreaElement>) => void;
type ReturnType<T = ChangeEvent<HTMLInputElement>> = [T, Handler, Dispatch<SetStateAction<T>>];
const useInput = <T>(initialData: T): ReturnType<T> => {
  const [value, setvalue] = useState(initialData);
  const handler = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setvalue(e.target.value as unknown as T);
  }, []);
  return [value, handler, setvalue];
};

export default useInput;

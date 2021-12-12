import { useQuery } from "@apollo/client";
import { GET_BOOK } from "../queries/queries";

export const useBook = (id) => {
  const { data, error, loading } = useQuery(GET_BOOK, {
    variables: {
      id,
    },
  });
  return {
    data,
    error,
    loading,
  };
};

export default useBook;

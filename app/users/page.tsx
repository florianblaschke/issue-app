import UserTable from "./UserTable";

interface Props {
  searchParams: { sortOrder: string };
}

const UsersPage = ({ searchParams: { sortOrder } }: Props) => {
  return (
    <>
      <UserTable sortOrder={sortOrder} />
    </>
  );
};

export default UsersPage;

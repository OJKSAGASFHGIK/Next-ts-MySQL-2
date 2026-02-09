type Props = {
  params: {
    id: string;
  };
};

export default function Update({ params }: Props) {
  return <div>Book ID: {params.id}</div>;
}

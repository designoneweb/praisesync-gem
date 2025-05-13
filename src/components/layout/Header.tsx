interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="bg-off-white shadow-sm p-4 sticky top-0 z-10">
      <h1 className="text-xl font-semibold text-navy">{title}</h1>
    </header>
  );
}

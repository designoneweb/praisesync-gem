interface PlaceholderComponentProps {
  title: string;
}

export default function PlaceholderComponent({ title }: PlaceholderComponentProps) {
  return (
    <div className="p-6 bg-off-white min-h-screen">
      <h2 className="text-2xl font-semibold text-navy mb-4">{title}</h2>
      <div className="bg-white p-8 rounded-lg shadow">
        <p className="text-gray-600">This is a placeholder for the {title} page. Content and functionality will be added here.</p>
        <p className="text-gray-500 mt-2 text-sm">Refer to the PRD and Spec documents for feature details.</p>
      </div>
    </div>
  );
}

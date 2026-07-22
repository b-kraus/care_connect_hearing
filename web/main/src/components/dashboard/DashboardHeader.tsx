type DashboardHeaderProps = {
  title: string;
  highlight?: string;
  description?: string;
};

function DashboardHeader({
  title,
  highlight,
  description,
}: DashboardHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="mb-2 text-4xl font-bold">
        {title}

        {highlight && (
          <>
            {" "}
            <span className="text-primary">{highlight}</span>
          </>
        )}
      </h1>

      {description && (
        <p className="text-white/60">
          {description}
        </p>
      )}
    </header>
  );
}

export default DashboardHeader;
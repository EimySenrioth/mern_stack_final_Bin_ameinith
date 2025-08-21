const WelcomeScreen = () => {
  const features = [
    {
      title: "Crear una imagen",
      description: "Genera, edita o varía imágenes",
      icon: "🎨"
    },
    {
      title: "Analizar documentos",
      description: "Sube y analiza archivos de texto",
      icon: "📄"
    },
    {
      title: "Programar",
      description: "Escribe y depura código",
      icon: "💻"
    },
    {
      title: "Obtener consejos",
      description: "Sobre cualquier tema",
      icon: "💡"
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">¿En qué estás trabajando?</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mb-8">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {feature.icon}
              </span>
              <div>
                <h3 className="font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WelcomeScreen;
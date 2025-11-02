const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 via-indigo-300 to-purple-300">
      <div className="w-16 h-16 border-4 rounded-full border-white/40 border-t-white animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;

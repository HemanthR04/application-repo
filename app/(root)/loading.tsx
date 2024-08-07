export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return  ( <div className="w-full h-screen flex items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-red-500" />
    </div>);
  }
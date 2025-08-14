import { ZapIcon } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-base-200/60 border border-base-300 rounded-2xl shadow-lg backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-center p-6 gap-6">
          <div className="bg-primary/20 p-4 rounded-2xl">
            <ZapIcon className="size-10 text-primary" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-semibold mb-2">Whoa there, Barista!</h3>
            <p className="text-base-content">
              Too many requests in a short time. Take a sip, relax, and try again soon.
            </p>
            <p className="text-sm text-base-content/70 mt-1">
              Your notes will still be here when you’re ready.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;

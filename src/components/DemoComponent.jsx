import React, { useState } from 'react';

const DemoComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="container py-8">
      <div className="text-center mb-8">
        <h1 className="fluid-heading gradient-text mb-4 animate-fade-in">
          Modern CSS Framework Demo
        </h1>
        <p className="fluid-text text-gray-600 dark:text-gray-400 animate-slide-up">
          Experience advanced glassmorphism, animations, and accessibility features
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Glassmorphism Cards Demo */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Glassmorphism Effects</h2>

          <div className="glass-card animate-scale-in">
            <h3 className="text-xl font-semibold mb-2">Primary Glass Card</h3>
            <p className="text-gray-600 dark:text-gray-400">
              This card features advanced glassmorphism with backdrop blur and gradient borders.
            </p>
            <button className="btn btn-primary mt-4 interaction-ripple">
              Interactive Button
            </button>
          </div>

          <div className="glass-card glass-strong animate-slide-in-left">
            <h3 className="text-xl font-semibold mb-2">Strong Glass Effect</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Enhanced glassmorphism with stronger blur and opacity effects.
            </p>
            <div className="flex gap-2 mt-4">
              <button className="btn btn-secondary interaction-lift">Lift Effect</button>
              <button className="btn btn-outline interaction-shake">Shake Effect</button>
            </div>
          </div>

          <div className="glass-card glass-subtle animate-slide-in-right">
            <h3 className="text-xl font-semibold mb-2">Subtle Glass Effect</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Minimal glassmorphism for subtle visual enhancement.
            </p>
            <button className="btn btn-primary interaction-pulse mt-4">
              Pulse Effect
            </button>
          </div>
        </div>

        {/* Form Demo */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Advanced Form Styling</h2>

          <div className="glass-card">
            <h3 className="text-xl font-semibold mb-4">Contact Form</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-group">
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="form-input w-full"
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-input w-full"
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="form-textarea w-full"
                  placeholder="Enter your message"
                />
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>

          {/* Animation Demo */}
          <div className="glass-card">
            <h3 className="text-xl font-semibold mb-4">Animation Showcase</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="btn btn-primary animate-bounce-in">Bounce In</button>
              <button className="btn btn-secondary animate-elastic">Elastic</button>
              <button className="btn btn-outline animate-zoom-in">Zoom In</button>
              <button className="btn btn-primary animate-rotate-in">Rotate In</button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading States Demo */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Loading States</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card text-center">
            <h3 className="text-lg font-semibold mb-4">Skeleton Loading</h3>
            <div className="space-y-3">
              <div className="loading-skeleton h-4 w-full"></div>
              <div className="loading-skeleton h-4 w-3/4"></div>
              <div className="loading-skeleton h-4 w-1/2"></div>
            </div>
          </div>

          <div className="glass-card text-center">
            <h3 className="text-lg font-semibold mb-4">Spinner Loading</h3>
            <div className="flex justify-center items-center h-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </div>

          <div className="glass-card text-center">
            <h3 className="text-lg font-semibold mb-4">Pulse Loading</h3>
            <div className="animate-pulse bg-primary h-8 w-20 mx-auto rounded"></div>
          </div>
        </div>
      </div>

      {/* Accessibility Demo */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Accessibility Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card">
            <h3 className="text-lg font-semibold mb-4">Focus Management</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Enhanced focus indicators and keyboard navigation support.
            </p>
            <button className="btn btn-primary focus-ring mr-2">Focus Ring</button>
            <button className="btn btn-secondary focus-visible:ring">Focus Visible</button>
          </div>

          <div className="glass-card">
            <h3 className="text-lg font-semibold mb-4">Screen Reader Support</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              ARIA attributes and semantic HTML for assistive technologies.
            </p>
            <button
              className="btn btn-outline"
              aria-expanded={isOpen}
              aria-controls="demo-panel"
              onClick={() => setIsOpen(!isOpen)}
            >
              Toggle Panel
            </button>
            {isOpen && (
              <div id="demo-panel" className="mt-4 p-4 bg-primary/10 rounded-lg animate-fade-in">
                <p className="text-sm">This panel is controlled by ARIA attributes.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Responsive Demo */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Responsive Design</h2>
        <div className="grid grid-responsive gap-6">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="glass-card text-center animate-fade-in">
              <h3 className="text-lg font-semibold mb-2">Card {i + 1}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Responsive grid that adapts to screen size.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DemoComponent;
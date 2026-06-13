import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="gauge-card" style={{ border: '1px solid red' }}>
          <h3>Sensor Unavailable</h3>
          <p>Check connection or API.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
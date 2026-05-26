import React from 'react'

export const Map = ({ children }: { children?: React.ReactNode }) => (
  <div data-testid="map-container">{children}</div>
)
export const Source = ({ children }: { children?: React.ReactNode }) => <>{children}</>
export const Layer = () => null
export const NavigationControl = () => null

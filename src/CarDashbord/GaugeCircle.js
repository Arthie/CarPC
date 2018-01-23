import React, { Component } from "react"

class GaugeCircle extends Component {
  state = {
    circumference: 0,
    rotateAngle: 0
  }

  calcArc = _ => {
    //get radius + calculate circumference
    const circumference = 2 * Math.PI * this.props.r
    const rotateAngle =
      360 * this.props.cutoutPercentage / 2 + this.props.startAngle

    this.setState({
      circumference,
      rotateAngle
    })
  }

  setGaugeValue = value => {
    const per =
      value / this.props.maxValue > 1 ? 1 : value / this.props.maxValue
    return (
      this.state.circumference * (1 - per * (1 - this.props.cutoutPercentage))
    )
  }

  componentWillMount() {
    this.calcArc()
  }

  render() {
    return (
      <g transform={`rotate(${this.state.rotateAngle} 50,50)`}>
      <circle
        cx="50"
        cy="50"
        r={this.props.r}
        fill={this.props.fillBackground}
        stroke={this.props.strokeBackground}
        strokeWidth={this.props.strokeWidthBackground}
        strokeDashoffset={
          this.state.circumference * this.props.cutoutPercentage
        }
        strokeDasharray={this.state.circumference}
        strokeLinejoin="round"
        strokeLinecap={this.props.strokeLinecapBackground}
        paintOrder="markers stroke fill"
      />
      <circle
        cx="50"
        cy="50"
        r={this.props.r}
        fill={this.props.fill}
        stroke={this.props.stroke}
        strokeWidth={this.props.strokeWidth}
        strokeDashoffset={this.setGaugeValue(this.props.value)}
        strokeDasharray={this.state.circumference}
        strokeLinejoin="round"
        strokeLinecap={this.props.strokeLinecap}
        paintOrder="markers stroke fill"
      />
    </g>
    )
  }
}

//to do: add missing props defaults
GaugeCircle.defaultProps = {
  gaugeValue: 0,
  startAngle: 0,
  cutoutPercentage: 0,
  r: 0,
  maxValue: 0,
}

export { GaugeCircle }

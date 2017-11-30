import React, { Component } from 'react';
import { Table, Checkbox, Header } from 'semantic-ui-react'
import RawTable from './RawTable.js'
import AggregateTable from './AggregateTable.js'

class Endpoint extends Component {
  state = {
    showAggregates: false,
  }

  showAggregatesChanged = (e) => {
    this.setState({showAggregates: !this.state.showAggregates})
  }

  render() {
    return (
      <div>
        <Checkbox toggle label='Aggregates' onChange={this.showAggregatesChanged} style={{float:'right'}} />
        <Header as='h1'>{this.props.endpoint}</Header>
        {this.state.showAggregates ?
          <AggregateTable entries={this.props.aggregates} /> :
          <RawTable entries={this.props.logs} />
        }

      </div>
    )
  }
}

export default Endpoint
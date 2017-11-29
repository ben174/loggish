import React, { Component } from 'react';
import { Table, Checkbox, Header } from 'semantic-ui-react'
import RawTable from './RawTable.js'
import AggregateTable from './AggregateTable.js'

class Endpoint extends Component {
  render() {
    return (
      <div>
        <Header as='h1'>{this.props.endpoint}</Header>
        <Checkbox toggle label='Aggregates' />
        <RawTable entries={this.props.logs} />
        <AggregateTable entries={this.props.aggregates} />
      </div>
    )
  }
}

export default Endpoint
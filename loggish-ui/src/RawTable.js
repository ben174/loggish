import React, { Component } from 'react';
import { Table, Header } from 'semantic-ui-react'

class RawTable extends Component {
  render() {
    return (
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>Timestamp</Table.HeaderCell>
            <Table.HeaderCell>IP Address</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.entries.map(row =>
            <Table.Row key={row.timestamp}>
              <Table.Cell>
                {row.nativeTimestamp.format('MM/DD/YY HH:mm:ss')}
              </Table.Cell>
              <Table.Cell>
                <Header as='h2'>{row.ip}</Header>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    )
  }
}

export default RawTable
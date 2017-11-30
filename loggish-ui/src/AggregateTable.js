import React, { Component } from 'react';
import { Table, Header } from 'semantic-ui-react'

class AggregateTable extends Component {
  render() {
    return (
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>Timestamp</Table.HeaderCell>
            <Table.HeaderCell>IP / Count</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.keys(this.props.entries).map(key =>
            <Table.Row key={key}>
              <Table.Cell>
                <Header as='h2'>{key}</Header>
              </Table.Cell>
              <Table.Cell>
                <Table compact>
                  <Table.Body>
                    {Object.keys(this.props.entries[key]).map(ip =>
                      <Table.Row key={key}>
                        <Table.Cell>
                          {ip}
                        </Table.Cell>
                        <Table.Cell>
                          {this.props.entries[key][ip]}
                        </Table.Cell>
                      </Table.Row>
                    )}
                  </Table.Body>
                </Table>

                <Header as='h2'>{this.props.entries[key].ip}</Header>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    )
  }
}

export default AggregateTable

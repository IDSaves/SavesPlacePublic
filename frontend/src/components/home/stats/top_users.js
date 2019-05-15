import React from 'react'
import { Block, BlockBody, BlockHeader, BlockFooter } from '../../_help/_index.js'

export default function TopUsers(props) {
  const { top_users } = props
  return(
    <Block className="mb-3">
      <BlockHeader className="text-center">
        <h5 className="m-0">Top Users</h5>
      </BlockHeader>
      <BlockBody className="pt-0">
        <div className="table-responsive">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Nickname</th>
                <th>Events</th>
              </tr>
            </thead>
            <tbody>
              {top_users && !top_users.error ? top_users.map((user, i) => (
                <tr key={i}>
                  <td>{i+1}</td>
                  <td>{user.nickname}</td>
                  <td>{user.rating}</td>
                </tr>
              )) : (
                <tr>
                  <td></td>
                  <td>Loading...</td>
                  <td>Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </BlockBody>
    </Block>
  )
}

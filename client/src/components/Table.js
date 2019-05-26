import React, { Component } from 'react'

//import Icon from './Icon';

class Table extends Component {
  /*
   * IGNORE THIS PAGE ******************************
   */
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     data: props.data
  //   }
  // }
  // refresh() {
  //   this.retrieveAll().then(response => {
  //     this.setState({ data: response.data })
  //   })
  // }
  // render() {
  //   return (
  //     <React.Fragment>
  //       <div className="container-fluid mt-3">
  //         {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
  //         <table className="table table-sm table-profile">
  //           <thead style={{ border: '1px solid white' }}>
  //             <caption style={{ textTransform: 'capitalize', border: 0 }}>
  //               <h3>{this.TABLE}</h3>
  //             </caption>
  //           </thead>
  //           <tbody>
  //             {this.props.data.map(dat => (
  //               <>
  //                 <tr key={dat.id}>
  //                   <td colname="id">#{dat.id}</td>
  //                   <td colname="name">
  //                     <Icon type="icon-id-card-o" />
  //                     {dat.name}
  //                   </td>
  //                   <td colname="client">
  //                     <Icon type="icon-user-circle-o" />
  //                     {dat.clientId}
  //                   </td>
  //                   <td colname="address">{dat.address}</td>
  //                   <td colname="phone#">{dat.phoneNumber}</td>
  //                   <td style={{ borderLeft: '1px solid #ddd' }}>
  //                     <button
  //                       className="btn btn-sm btn-transparent p-0"
  //                       onClick={() => this.updateClicked(dat.id)}
  //                     >
  //                       <Icon type="icon-pencil" />
  //                     </button>
  //                     <button
  //                       className="btn btn-sm btn-transparent p-0"
  //                       onClick={() => this.deleteClicked(dat.id)}
  //                     >
  //                       <Icon type="icon-trash" />
  //                     </button>
  //                   </td>
  //                 </tr>
  //               </>
  //             ))}
  //           </tbody>
  //         </table>
  //         <div className="row mt-2">
  //           <div className="col">
  //             <button
  //               className="btn btn-sm btn-success"
  //               tablename={'clients'}
  //               onClick={this.addClicked}
  //             >
  //               <Icon type="icon-plus" />
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </React.Fragment>
  //   )
  // }
}

export default Table

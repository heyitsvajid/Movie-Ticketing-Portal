import React, { Component } from 'react';

class Pagination extends Component {

  constructor(){
    super();
    this.state = { data: [], currentPage: 1, perPageRows: 2 };
  }
  
  

  render() {
    
    return (
      <div class="text-center">
        <nav aria-label="pagination example" className="pagination-list">
          <ul className="pagination pg-blue">
              <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous" onClick={this.props.handlePrevPaginationButton}>
                      <span aria-hidden="true">&laquo;</span>
                  </a>
              </li>
              {this.props.pagination_list}
              <li className="page-item">
                  <a class="page-link" href="#" aria-label="Next"onClick={this.props.handleNextPaginationButton}>
                      <span aria-hidden="true">&raquo;</span>
                  </a>
              </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Pagination;

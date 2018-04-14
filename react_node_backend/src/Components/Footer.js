import React, { Component } from 'react';

import { withRouter } from 'react-router-dom'

class Footer extends Component {



    render() {
        return (

            <div>

                <footer class="sticky-footer">
                    <div class="container mt-5">
                        <div class="text-center">
                            <small>Copyright © Freelancer 2018</small>
                        </div>
                    </div>
                </footer>       </div>

        );
    }
}
export default withRouter(Footer);
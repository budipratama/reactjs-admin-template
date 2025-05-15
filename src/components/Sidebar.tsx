import { JSX } from "react";

const Sidebar = (): JSX.Element => {
  return (
    <aside className='sidebar'>
      <ul>
        <li className='sidebar__active'>
          <i className='fa-solid fa-user'></i> General
        </li>
        <li>
          <i className='fa-solid fa-user'></i> Basic
        </li>
        <li>
          <i className='fa-solid fa-user'></i> Analytic
        </li>
        <li>
          <i className='fa-solid fa-user'></i> Campaign
        </li>
        <li>
          <i className='fa-solid fa-user'></i> Modern
        </li>
        <li className='has-child'>
          <i className='fa-solid fa-user'></i> eCommerce
          <ul>
            <li>
              <i className='fa-solid fa-user'></i> Dashboard
              <ul>
                <li>
                  <i className='fa-solid fa-user'></i> Dashboard
                  <ul>
                    <li>
                      <i className='fa-solid fa-user'></i> Dashboard
                      <ul>
                        <li>
                          <i className='fa-solid fa-user'></i> Dashboard
                          <ul>
                            <li>
                              <i className='fa-solid fa-user'></i> Dashboard
                              <ul>
                                <li>
                                  <i className='fa-solid fa-user'></i> Dashboard{" "}
                                  <ul>
                                    <li>
                                      <i className='fa-solid fa-user'></i>{" "}
                                      Dashboard
                                    </li>
                                    <li>
                                      <i className='fa-solid fa-user'></i>{" "}
                                      Product
                                    </li>
                                  </ul>
                                </li>
                                <li>
                                  <i className='fa-solid fa-user'></i> Product
                                </li>
                              </ul>
                            </li>
                            <li>
                              <i className='fa-solid fa-user'></i> Product
                            </li>
                          </ul>
                        </li>
                        <li>
                          <i className='fa-solid fa-user'></i> Product
                        </li>
                      </ul>
                    </li>
                    <li>
                      <i className='fa-solid fa-user'></i> Product
                    </li>
                  </ul>
                </li>
                <li>
                  <i className='fa-solid fa-user'></i> Product
                </li>
              </ul>
            </li>
            <li>
              <i className='fa-solid fa-user'></i> Product
            </li>
          </ul>
        </li>
        <li>
          <i className='fa-solid fa-user'></i> Basic
        </li>
        <li>
          <i className='fa-solid fa-user'></i> Analytic
        </li>
        <li>
          <i className='fa-solid fa-user'></i> Campaign
        </li>
        <li>
          <i className='fa-solid fa-user'></i> Modern
        </li>
        <li>
          <i className='fa-solid fa-user'></i> Basic
        </li>
        <li>
          <i className='fa-solid fa-user'></i> Analytic
        </li>
        <li>
          <i className='fa-solid fa-user'></i> Campaign
        </li>
        <li>
          <i className='fa-solid fa-user'></i> Modern
        </li>
        <li>
          <i className='fa-solid fa-user'></i> Basic
        </li>
        <li>
          <i className='fa-solid fa-user'></i> Analytic
        </li>
        {/* <li>
            <i className='fa-solid fa-user'></i> Campaign
          </li>
          <li>
            <i className='fa-solid fa-user'></i> Modern
          </li>
          <li>
            <i className='fa-solid fa-user'></i> Basic
          </li>
          <li>
            <i className='fa-solid fa-user'></i> Analytic
          </li>
          <li>
            <i className='fa-solid fa-user'></i> Campaign
          </li>
          <li>
            <i className='fa-solid fa-user'></i> Modern
          </li> */}
      </ul>
    </aside>
  );
};

export default Sidebar;

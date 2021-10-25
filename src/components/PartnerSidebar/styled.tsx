import styled from '@emotion/styled';
export const SidebarWarp = styled.div`
  .pro-sidebar {
    color: #adadad;
    height: 100%;
    width: 270px;
    min-width: 270px;
    text-align: left;
    transition: width, left, right, 0.3s;
    position: relative;
    z-index: 1009;
  }
  .pro-sidebar > .pro-sidebar-inner {
    background: transparent;
    height: 100%;
    position: relative;
    z-index: 101;
  }
  .pro-sidebar > .pro-sidebar-inner > img.sidebar-bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    position: absolute;
    opacity: 0.3;
    left: 0;
    top: 0;
    z-index: 100;
  }
  .pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    z-index: 101;
  }
  .pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout .pro-sidebar-header {
    border-bottom: 1px solid rgba(173, 173, 173, 0.2);
  }
  .pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout .pro-sidebar-content {
    flex-grow: 1;
  }
  .pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout .pro-sidebar-footer {
    border-top: 1px solid rgba(173, 173, 173, 0.2);
  }
  .pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  .pro-sidebar .overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 100;
    display: none;
  }
  .pro-sidebar.collapsed {
    width: 80px;
    min-width: 80px;
  }
  .pro-sidebar.rtl {
    text-align: right;
    direction: rtl;
  }
  @media (max-width: 480px) {
    .pro-sidebar.xs {
      position: fixed;
      left: -270px;
    }
    .pro-sidebar.xs.collapsed {
      left: -80px;
    }
    .pro-sidebar.xs.toggled {
      left: 0;
    }
    .pro-sidebar.xs.toggled .overlay {
      display: block;
    }
    .pro-sidebar.xs.rtl {
      left: auto;
      right: -270px;
    }
    .pro-sidebar.xs.rtl.collapsed {
      left: auto;
      right: -80px;
    }
    .pro-sidebar.xs.rtl.toggled {
      left: auto;
      right: 0;
    }
  }
  @media (max-width: 576px) {
    .pro-sidebar.sm {
      position: fixed;
      left: -270px;
    }
    .pro-sidebar.sm.collapsed {
      left: -80px;
    }
    .pro-sidebar.sm.toggled {
      left: 0;
    }
    .pro-sidebar.sm.toggled .overlay {
      display: block;
    }
    .pro-sidebar.sm.rtl {
      left: auto;
      right: -270px;
    }
    .pro-sidebar.sm.rtl.collapsed {
      left: auto;
      right: -80px;
    }
    .pro-sidebar.sm.rtl.toggled {
      left: auto;
      right: 0;
    }
  }
  @media (max-width: 768px) {
    .pro-sidebar.md {
      position: fixed;
      left: -270px;
    }
    .pro-sidebar.md.collapsed {
      left: -80px;
    }
    .pro-sidebar.md.toggled {
      left: 0;
    }
    .pro-sidebar.md.toggled .overlay {
      display: block;
    }
    .pro-sidebar.md.rtl {
      left: auto;
      right: -270px;
    }
    .pro-sidebar.md.rtl.collapsed {
      left: auto;
      right: -80px;
    }
    .pro-sidebar.md.rtl.toggled {
      left: auto;
      right: 0;
    }
  }
  @media (max-width: 992px) {
    .pro-sidebar.lg {
      position: fixed;
      left: -270px;
    }
    .pro-sidebar.lg.collapsed {
      left: -80px;
    }
    .pro-sidebar.lg.toggled {
      left: 0;
    }
    .pro-sidebar.lg.toggled .overlay {
      display: block;
    }
    .pro-sidebar.lg.rtl {
      left: auto;
      right: -270px;
    }
    .pro-sidebar.lg.rtl.collapsed {
      left: auto;
      right: -80px;
    }
    .pro-sidebar.lg.rtl.toggled {
      left: auto;
      right: 0;
    }
  }
  @media (max-width: 1200px) {
    .pro-sidebar.xl {
      position: fixed;
      left: -270px;
    }
    .pro-sidebar.xl.collapsed {
      left: -80px;
    }
    .pro-sidebar.xl.toggled {
      left: 0;
    }
    .pro-sidebar.xl.toggled .overlay {
      display: block;
    }
    .pro-sidebar.xl.rtl {
      left: auto;
      right: -270px;
    }
    .pro-sidebar.xl.rtl.collapsed {
      left: auto;
      right: -80px;
    }
    .pro-sidebar.xl.rtl.toggled {
      left: auto;
      right: 0;
    }
  }

  .pro-sidebar
    .pro-menu
    .pro-menu-item.pro-sub-menu
    .pro-inner-list-item
    .pro-inner-item:before {
    content: '';
    display: none;
    width: 20px;
    min-width: 4px;
    height: 4px;
    border: 1px solid transparent;
    border-radius: 50%;
    margin-right: 15px;
    //position: relative;
    //box-shadow: 1px 0px 0px #adadad, 0px -1px 0px #adadad, 0px 1px 0px #adadad,
    //  -1px 0px 0px #adadad;
  }

  .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item > .pro-item-content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
    line-height: 24px;
    position: relative;
  }

  .pro-sidebar .pro-menu {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .pro-sidebar .pro-menu > ul > .pro-sub-menu > .pro-inner-list-item {
    position: relative;
    background-color: transparent;
  }
  .pro-sidebar
    .pro-menu
    > ul
    > .pro-sub-menu
    > .pro-inner-list-item
    > div
    > ul {
    padding-top: 0;
    padding-bottom: 0;
    list-style: none !important;
  }
  .pro-sidebar .pro-menu a {
    text-decoration: none;
    color: #adadad;
  }
  .pro-sidebar .pro-menu a:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: transparent;
  }
  .pro-sidebar .pro-menu a:hover {
    color: #d8d8d8;
  }
  .pro-sidebar .pro-menu .pro-menu-item {
    font-size: 15px;
  }
  .pro-sidebar .pro-menu .pro-menu-item.active {
    color: #d8d8d8;
  }
  .pro-sidebar .pro-menu .pro-menu-item .suffix-wrapper {
    opacity: 1;
    transition: opacity 0.2s;
  }
  .pro-sidebar .pro-menu .pro-menu-item .prefix-wrapper {
    display: flex;
    margin-right: 5px;
    opacity: 1;
    transition: opacity 0.2s;
  }
  .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 8px 35px 8px 20px;
    cursor: pointer;
  }
  .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item.flex-end {
    position: relative;
    display: flex;
    align-items: end;
    padding: 8px 35px 8px 20px;
    cursor: pointer;
  }
  .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item:focus {
    outline: none;
    color: #d8d8d8;
  }
  .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item > .pro-icon-wrapper {
    margin-right: 10px;
    font-size: 14px;
    width: 35px;
    min-width: 35px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    display: inline-block;
    color: #6c6f84;
    position: relative;
  }
  .pro-sidebar
    .pro-menu
    .pro-menu-item
    > .pro-inner-item
    > .pro-icon-wrapper
    .pro-icon {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
  .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item > .pro-item-content {
    flex-grow: 1;
    flex-shrink: 1;
  }
  .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item:hover {
    //color: #d8d8d8;
  }

  .pro-sidebar .pro-menu .pro-menu-item.pro-sub-menu > .pro-inner-item:before {
    background: #adadad;
  }
  .pro-sidebar
    .pro-menu
    .pro-menu-item.pro-sub-menu
    > .pro-inner-item
    > .pro-arrow-wrapper {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
  .pro-sidebar
    .pro-menu
    .pro-menu-item.pro-sub-menu
    > .pro-inner-item
    > .pro-arrow-wrapper
    .pro-arrow {
    display: inline-block;
    border-style: solid;
    border-color: #adadad;
    border-width: 0 2px 2px 0;
    padding: 2.5px;
    vertical-align: middle;
    transition: transform 0.3s;
    transform: rotate(-45deg);
  }
  //.pro-sidebar
  //  .pro-menu
  //  .pro-menu-item.pro-sub-menu.open
  //  > .pro-inner-item:before {
  //  background: transparent !important;
  //}
  .pro-sidebar
    .pro-menu
    .pro-menu-item.pro-sub-menu.open
    > .pro-inner-item
    > .pro-arrow-wrapper
    .pro-arrow {
    transform: rotate(45deg);
  }
  .pro-sidebar .pro-menu .pro-menu-item.pro-sub-menu .pro-inner-list-item {
    padding-left: 14px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .pro-sidebar
    .pro-menu
    .pro-menu-item.pro-sub-menu
    .pro-inner-list-item
    .pro-inner-item {
    padding: 8px 30px 8px 15px;
  }
  .pro-sidebar
    .pro-menu
    .pro-menu-item.pro-sub-menu
    .pro-inner-list-item
    .pro-inner-item
    > .pro-icon-wrapper {
    //display: none;
  }
  .pro-sidebar
    .pro-menu
    .pro-menu-item.pro-sub-menu
    .pro-inner-list-item
    .pro-inner-item
    .pro-arrow-wrapper {
    display: none;
  }
  .pro-sidebar
    .pro-menu.shaped
    .pro-menu-item
    > .pro-inner-item
    > .pro-icon-wrapper {
    background-color: transparent;
  }
  .pro-sidebar
    .pro-menu.square
    .pro-menu-item
    > .pro-inner-item
    > .pro-icon-wrapper {
    border-radius: 0;
  }
  .pro-sidebar
    .pro-menu.round
    .pro-menu-item
    > .pro-inner-item
    > .pro-icon-wrapper {
    border-radius: 4px;
  }
  .pro-sidebar
    .pro-menu.circle
    .pro-menu-item
    > .pro-inner-item
    > .pro-icon-wrapper {
    border-radius: 50%;
  }

  .pro-sidebar.collapsed .pro-menu > ul > .pro-menu-item {
    position: relative;
  }
  .pro-sidebar.collapsed
    .pro-menu
    > ul
    > .pro-menu-item
    > .pro-inner-item
    > .suffix-wrapper,
  .pro-sidebar.collapsed
    .pro-menu
    > ul
    > .pro-menu-item
    > .pro-inner-item
    > .prefix-wrapper {
    opacity: 0;
  }
  .pro-sidebar.collapsed
    .pro-menu
    > ul
    > .pro-menu-item
    > .pro-inner-list-item {
    background-color: transparent;
    z-index: 111;
  }
  .pro-sidebar.collapsed .pro-menu > ul > .pro-menu-item::before {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    cursor: pointer;
  }
  .pro-sidebar.collapsed .pro-menu > ul > .pro-menu-item.pro-sub-menu {
    position: relative;
  }
  .pro-sidebar.collapsed
    .pro-menu
    > ul
    > .pro-menu-item.pro-sub-menu
    > .pro-inner-item {
    pointer-events: none;
  }
  .pro-sidebar.collapsed
    .pro-menu
    > ul
    > .pro-menu-item.pro-sub-menu
    > .pro-inner-item
    > .pro-arrow-wrapper {
    display: none;
  }
  .pro-sidebar.collapsed
    .pro-menu
    > ul
    > .pro-menu-item.pro-sub-menu
    > .pro-inner-list-item {
    height: auto !important;
    position: fixed;
    visibility: hidden;
    min-width: 220px;
    max-width: 270px;
    background-color: white;
    max-height: 100%;
    padding-left: 3px;
    border-radius: 4px;
    box-shadow: var(--ste-shadows-md);
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .pro-sidebar.collapsed
    .pro-menu
    > ul
    > .pro-menu-item.pro-sub-menu
    > .pro-inner-list-item.has-arrow {
    padding-left: 10px;
  }
  .pro-sidebar.collapsed
    .pro-menu
    > ul
    > .pro-menu-item.pro-sub-menu
    > .pro-inner-list-item
    > .popper-inner {
    max-height: 100vh;
    overflow-y: auto;
    background-color: transparent;
    padding-left: 20px;
    border-radius: 4px;
  }
  .pro-sidebar.collapsed
    .pro-menu
    > ul
    > .pro-menu-item.pro-sub-menu:hover
    > .pro-inner-list-item {
    transition: visibility, transform 0.3s;
    visibility: visible;
  }
  .pro-sidebar.collapsed
    .pro-menu
    > ul
    > .pro-menu-item.pro-sub-menu:hover
    .pro-icon-wrapper
    .pro-icon {
    animation: swing ease-in-out 0.5s 1 alternate;
  }
  .pro-sidebar.collapsed
    .pro-menu
    > ul
    > .pro-menu-item.pro-sub-menu
    .pro-inner-list-item
    .pro-sub-menu-item,
  .pro-sidebar.collapsed
    .pro-menu
    > ul
    > .pro-menu-item.pro-sub-menu
    .pro-inner-list-item
    .pro-inner-item {
    padding: 8px 30px 8px 5px;
  }

  .pro-sidebar.rtl .pro-menu .pro-menu-item .prefix-wrapper {
    margin-right: 0;
    margin-left: 5px;
  }

  .pro-sidebar.rtl .pro-menu .pro-menu-item > .pro-inner-item {
    padding: 8px 20px 8px 35px;
  }
  .pro-sidebar.rtl
    .pro-menu
    .pro-menu-item
    > .pro-inner-item
    > .pro-icon-wrapper {
    margin-right: 0;
    margin-left: 10px;
  }

  .pro-sidebar.rtl
    .pro-menu
    .pro-menu-item.pro-sub-menu
    > .pro-inner-item
    > .pro-arrow-wrapper {
    right: auto;
    left: 20px;
  }
  .pro-sidebar.rtl
    .pro-menu
    .pro-menu-item.pro-sub-menu
    > .pro-inner-item
    > .pro-arrow-wrapper
    .pro-arrow {
    transform: rotate(135deg);
  }

  .pro-sidebar.rtl
    .pro-menu
    .pro-menu-item.pro-sub-menu.open
    > .pro-inner-item
    > .pro-arrow-wrapper
    .pro-arrow {
    transform: rotate(45deg);
  }

  .pro-sidebar.rtl .pro-menu .pro-menu-item.pro-sub-menu .pro-inner-list-item {
    padding-left: 0;
    padding-right: 20px;
  }
  .pro-sidebar.rtl
    .pro-menu
    .pro-menu-item.pro-sub-menu
    .pro-inner-list-item
    .pro-inner-item {
    padding: 8px 15px 8px 30px;
  }
  .pro-sidebar.rtl
    .pro-menu
    .pro-menu-item.pro-sub-menu
    .pro-inner-list-item
    .pro-inner-item:before {
    margin-right: 0;
    margin-left: 15px;
  }

  .pro-sidebar.rtl.collapsed
    .pro-menu
    > ul
    > .pro-menu-item.pro-sub-menu
    > .pro-inner-list-item {
    padding-left: 0;
    padding-right: 3px;
  }
  .pro-sidebar.rtl.collapsed
    .pro-menu
    > ul
    > .pro-menu-item.pro-sub-menu
    > .pro-inner-list-item.has-arrow {
    padding-right: 10px;
  }
  .pro-sidebar.rtl.collapsed
    .pro-menu
    > ul
    > .pro-menu-item.pro-sub-menu
    > .pro-inner-list-item
    > .popper-inner {
    padding-left: 0;
    padding-right: 20px;
  }

  .pro-sidebar.rtl.collapsed
    .pro-menu
    > ul
    > .pro-menu-item.pro-sub-menu
    .pro-inner-list-item
    .pro-sub-menu-item,
  .pro-sidebar.rtl.collapsed
    .pro-menu
    > ul
    > .pro-menu-item.pro-sub-menu
    .pro-inner-list-item
    .pro-inner-item {
    padding: 8px 5px 8px 30px;
  }

  .popper-arrow {
    position: absolute;
    z-index: -1;
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
  }

  .popper-element[data-popper-placement^='left'] > .popper-arrow {
    right: 0;
    border-right: 7px solid transparent;
  }

  .popper-element[data-popper-placement^='right'] > .popper-arrow {
    left: 0;
    border-left: 7px solid transparent;
  }

  .react-slidedown {
    height: 0;
    transition-property: none;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
  }

  .react-slidedown.transitioning {
    overflow-y: hidden;
  }

  .react-slidedown.closed {
    display: none;
  }
  .pro-sidebar .pro-menu .pro-menu-item .pro-inner-item {
    position: relative;
  }
  .pro-sidebar .pro-menu .pro-menu-item.active > .pro-inner-item:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 3px;
    background-color: #000 !important;
  }
  .pro-sidebar .pro-menu .pro-menu-item.active > .pro-inner-item:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #e9e9e9 !important;
  }
  .pro-sidebar .pro-menu .pro-menu-item.level2 {
    position: relative;
  }
  .pro-sidebar .pro-menu .pro-menu-item.level2:before {
    content: '';
    position: absolute;
    top: 23px;
    left: 19px;
    height: 1px;
    width: 20px;
    background-color: #b1b8c2 !important;
  }
  .pro-sidebar .pro-menu .pro-menu-item.level2.lv2-last:after {
    content: '';
    position: absolute;
    top: 24px;
    left: 17px;
    height: 100%;
    width: 5px;
    background-color: white !important;
    z-index: 2;
  }
  .pro-sidebar .pro-menu .pro-menu-item.level1 {
    position: relative;
    overflow: hidden;
  }
  .pro-sidebar .pro-menu .pro-menu-item.level1:before {
    content: '';
    position: absolute;
    top: 65px;
    left: 32px;
    height: 100%;
    width: 1px;
    background-color: #b1b8c2 !important;
    z-index: 1;
  }
  .pro-sidebar .pro-menu .pro-menu-item.as-menu > .pro-inner-list-item {
    position: relative;
    top: -35px;
  }
  .pro-sidebar .pro-menu .pro-menu-item.as-menu > .pro-inner-item {
    opacity: 0;
  }

  .pro-sidebar
    .pro-menu
    .pro-menu-item.pro-sub-menu.level1.active
    > .pro-inner-item {
    background-color: #e9e9e9;
  }
`;

import { bindLinks } from "../helper/bindLinks";
import Login from "./page/login";
import Dashboard from "./page/dashboard";
import Layout from "./component/layout";
import Header from "./component/header";
import Unauthorized from "./page/unauthorized";


const layout = new Layout();
// render the app shell (nav, main, footer)
layout.render();

const header = new Header();
header.render();
bindLinks();



// initialize all page class *after* page layout has rendered
const login = new Login();
const dashboard = new Dashboard();
const unauthorized = new Unauthorized();



const page = {
	login,
	dashboard,
	unauthorized
};

export default page


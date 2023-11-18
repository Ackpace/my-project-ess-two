
import { getByLabelText, fireEvent, getByPlaceholderText, getByRole, getByText, render, screen, waitFor, getByTestId } from '@testing-library/react';
import SignUp from './pages/SignUp';
import userEvent from '@testing-library/user-event';
import exp from 'constants';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import ContentDetails from './components/ContentDetails/ContentDetails'
import showToastErrMessage from './components/SignIn/SignIn';
import form from './pages/SignUp'
import TVShow from "./pages/TVShow";
import {  Pagination } from '@mui/material';
import register from './pages/SignUp'
import App from './App';
import SignIn from './components/SignIn/SignIn';
import Avatars from './components/Avatar/Avatar';
import Avatar from './components/Avatar/Avatar';
import Home from './pages/Home';
import ContentIntro from './pages/ContentInfo';
import CardSlider from './components/CardSlider/CardSlider';
import TmdbInput from './components/FormElements/TmdbInput';
import Accordion from './components/Accordion/Accordion';
import DragNDrop from './components/DragNDrop/DragNDrop';
import About from './pages/About';
import SliderMenu from './components/SliderMenu/SliderMenu';


const stubbedCountry = {
    poster_path: "/73gIfV8gDwkVgUrFDzt4TfZC9Zc.jpg",
     title: "It Lives Inside",
     release_date: "2023-09-06",
      vote_average: "5.9",
    original_title: "It Lives Inside",
     overview: "Desperate to fit in at school, Sam rejects her",
    backdrop_path: "/dp0rdbGSbZTyWumnbWspXQp87hA.jpg",
};

it("matches snapshot", () => {
  const { asFragment } = render(<ContentDetails movie={stubbedCountry} />);

  expect(asFragment()).toMatchSnapshot();
});
 



test("Login Form Heading present", () => {
  render(
    <BrowserRouter><SignUp /> </BrowserRouter>).container;
  //get by texta
  const headingelement = screen.getByTestId("signupform");
  expect(headingelement).toBeInTheDocument();
});



test("Check if Text Box for username is present by placeholder text", () => {
  render(
    <BrowserRouter><SignUp /> </BrowserRouter>).container;
  //get by role with parameters
  //get by placeholder text
  const passwordInput = screen.getByPlaceholderText("Jay Oh");
  expect(passwordInput).toBeInTheDocument();
});


test("Check if Text Box for email is present by placeholder text", () => {
  render(
    <BrowserRouter><SignUp /> </BrowserRouter>).container;

  //get by role with parameters
  //get by placeholder text
  const passwordInput = screen.getByPlaceholderText("JayIsAwesome@gmail.com");
  expect(passwordInput).toBeInTheDocument();
});



/*
jest.mock('./pages/Home', () => ({
  fetchPosts: jest.fn().mockReturnValue(Promise.resolve([])),
}));

describe('The DataViewer component', () => {
  describe('when provided with a dictionary', () => {
    it('should render a ReactJson component', async () => {
      const dataViewer = render(<Home/>);
      await dataViewer.findByTestId('react-json-view');
    });
  });
  describe('when provided with a string', () => {
    it('should render a paragraph with the provided string', async () => {
      const text = 'value';
      const dataViewer = render(<Home />);
      await dataViewer.findByText(text, { selector: 'p' });
    });
  });
});
*/

jest.mock('./components/CardSlider/CardSlider')

test('ParentComponent rendered', () => {
  render(<BrowserRouter><ContentIntro /> </BrowserRouter>).container
  expect(screen.getByTestId("custom-element")).toBeInTheDocument()
})

test('ChildComponent mock was called', () => {
  render(<BrowserRouter><ContentIntro /> </BrowserRouter>).container
  expect(CardSlider).toBeTruthy()
})

/*
describe("Test the ContentDetails Component",  ()=>{
  test("render the ContentDetails informations as h elements", async () =>{
    render(
      <DragNDrop/> ).container;
      const hList = await screen.findByRole("div");
      expect(hList).toHaveValue(1);
  })
})*/


describe("About Component",  ()=>{
  test("should render About Component correctly", () =>{
    render(
      <BrowserRouter><About /> </BrowserRouter>).container;
      const hList = screen.getByTestId("aboutdiv");
      expect(hList).toBeInTheDocument();
  })
})



it('renders an error with invalid password', () => {
  
  render(<BrowserRouter><SignIn /> </BrowserRouter>).container;
  const passwordField = screen.getByPlaceholderText('ex) 123123')
  const submitButton = screen.getByText('Sign in')
  


  fireEvent.focus(passwordField)
  fireEvent.change(passwordField, { target: { value: '1234' } })
  fireEvent.blur(passwordField)
 
  fireEvent.click(submitButton)
  expect(passwordField).toHaveTextContent("")
  
 })

/*
 describe('Student Toggle', () => {
  it('should display student', () => {
    const eventHandler = jest.fn();
    render(<BrowserRouter><SignUp /> </BrowserRouter>).container;
    const { getByTestId } = render(<form onClick={eventHandler}/>);

    
     const button = getByTestId('registebutton');
     fireEvent.click(button);
    

    expect(eventHandler).toHaveBeenCalled();
    //how do I test? <div style={studentDisplay ? {display:'block'} : {display:'none'}}>
  });
});
*/

///nazov///
  test("should render About Component correctly", () =>{
    render(
      <BrowserRouter><DragNDrop /> </BrowserRouter>).container;
      const hList = screen.getByRole("divn");
      expect(hList).toBeInTheDocument();
      expect(hList).toHaveTextContent("Submit")
  })


/*
  test("should display a blank login form, with remember me checked by default", async () => {
    render(
      <BrowserRouter><SignUp /> </BrowserRouter>).container;
  
    const loginForm = screen.findByTestId("login-form");
  
    expect(loginForm).toHaveFormValues({
      name: "",
      email: "",
      password: ""
    });
  });*/









// describe('expectedData', () => {
//     it('checks if returned data from API rendered into component', async () => {
//         render(<Genres genres setGenres selectedGenres setSelectedGenres />);

//         await waitFor(() => {
//             expect(screen.getByText("/value from the api")).toBeInTheDocument();
//         });
//     });
// });















//nazov z videa//
describe("Test the ContentDetails Component",  ()=>{
        test("render the ContentDetails informations as h elements", () =>{
          
          render(
            <BrowserRouter><DragNDrop /> </BrowserRouter>).container;
            const hList = screen.getByRole("divn");
            expect(hList).toHaveAttribute("role","divn")
        })
    })


/*    
    describe("Test the ContentDetails Component",  ()=>{
      test("render the ContentDetails informations as h elements", () =>{
        
        render(
          <BrowserRouter><SliderMenu /> </BrowserRouter>).container;
          const divElement = screen.getByRole("contentinfo")
          const buttonElement = screen.getByTestId("slidermenubutton")
          fireEvent.click(buttonElement)

          expect(divElement).toHaveTextContent("")
      })
  })
*/

/*
  it('renders an error with invalid password', () => {
    render(<BrowserRouter><SignIn /> </BrowserRouter>).container;
    const passwordField = screen.getByPlaceholderText('ex) 123123')
    const submitButton = screen.getByText('Sign in')
   
    fireEvent.focus(passwordField)
    fireEvent.change(passwordField, { target: { value: '1234' } })
    fireEvent.blur(passwordField)
   
    fireEvent.click(submitButton)
    expect(showToastErrMessage).toHaveTextContent("Incorrect Username/Password")
   })
*/

/*
describe("Test the ContentDetails Component", ()=>{
        test("render the ContentDetails informations as h elements", async () =>{
            const { getByText } = render(<SignUp />);
             const helloWorldElement = getByText("Hello World");
            expect(helloWorldElement).toBeInTheDocument();
        })
    })

    test("increments count on button click", () => {
        const { getByTestId } = render(<Pagination count={9} />);
        const countElement = getByTestId("count");
      
        expect(countElement.textContent).toBe("9");
      });

      test("increments count on button click", () => {
       render(<Pagination count={9} />);
       
      
       expect(screen.queryByTestId('count')).not.toBeInTheDocument();
    });

    import { BrowserRouter as Router } from "react-router-dom";

    test("renders about component when visiting the about route", () => {
        render(
          <Router >
            <App />
          </Router>
        );
      
        expect(screen.getByText("This is the About component")).toBeInTheDocument();
      });

*/
















    
// test("password input should have type password",()=>{
//     render(<SignUp/>)
//     const password = screen.getByPlaceholderText("123123");
//     expect(password). getByPlaceholderText("Password");
// });


// test("Login Form Heading present", () => {
//     render(<SignUp />);
//     //get by texta
//     const headingelement = screen.getByText(/join us/i);
//     expect(headingelement).toBeInTheDocument();
//   });
























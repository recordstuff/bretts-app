import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import History from './pages/History';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ErrorBoundary } from './components/ErrorBoundary';

const theme = createTheme({
    palette: {
        mode: 'dark'
    },
})

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ErrorBoundary>
                <BrowserRouter>
                    <Routes>
                        <Route path='/login' element={<Login />} />
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="history" element={<History />} />
                            <Route path="profile" element={<Profile />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </ErrorBoundary>
        </ThemeProvider>
    );
}

export default App

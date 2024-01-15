import React, { ErrorInfo } from "react";

interface Props {
    children?: React.ReactNode
}

interface State {
    hasError: boolean
    message: string
    name: string
}

export class ErrorBoundary extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, message: '', name: '' };
    }

    public static getDerivedStateFromError(error: Error) {
        return { hasError: true, message: error.message, name: error.name }
    }

    public componentDidMount(): void {
        window.addEventListener('error', (event: ErrorEvent) => {
            this.setState({ hasError: true, message: event.message, name: 'Unhandled Error' })
        });

        window.addEventListener("unhandledrejection", (event: PromiseRejectionEvent) => {
            this.setState({ hasError: true, message: event.reason.toString(), name: event.type })
        });
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <h1>Unfortunate Occurance</h1>
                    <p>The application experienced a problem.</p>
                    <p>Unhandled Error {this.state.name !== "Error" ? `: ${this.state.name}` : ''}</p>
                    <p>{this.state.message}</p>
                </>
            )
        }

        return this.props.children
    }
}
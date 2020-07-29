import {
    Button,
    createStyles,
    FormControl,
    Input,
    InputLabel,
    Theme,
    Typography,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import * as React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const styles = (theme: Theme) => createStyles({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        marginTop: theme.spacing(6.8),
        borderRadius: 3,
        letterSpacing: 0.75,
        fontSize: 14,
    },
    header: {
        letterSpacing: 0.15,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    label: {
        color: '#000000',
        opacity: 0.54,
        letterSpacing: 0.4,
    },
    captcha: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        marginTop: 20,
    },
    inputOpacity: {
        opacity: 1,
    },
});

interface StyleProps extends WithStyles<typeof styles> {
    theme: Theme;
}

interface OwnProps {
    email: string;
    password: string;
    handleChangeEmail: (email: string) => void;
    handleChangePassword: (password: string) => void;
    handleOTPCode: (otpCode: string) => void;
    handleSignIn: () => void;
    require2FA?: boolean;
    captchaOnChange: () => void;
    siteKey: string;
    captchaType: 'recaptcha' | 'geetest' | 'none';
    captchaChecked: boolean;
}

type Props = StyleProps & OwnProps;

class LoginComponent extends React.Component<Props> {
    public render() {
        const {
            classes,
            email,
            password,
        } = this.props;

        return (
            <React.Fragment>
                <Typography className={classes.header} variant="h6">
                    Sign in
                </Typography>
                <form className={classes.form}>
                    <FormControl margin="normal" required={true} fullWidth={true}>
                        <InputLabel htmlFor="email" className={classes.label}>Email</InputLabel>
                        <Input
                            id="email"
                            name="email"
                            value={email}
                            onChange={this.handleEmail}
                            autoComplete="email"
                            autoFocus={true}
                            placeholder="Enter email address"
                            classes={{
                                input: classes.inputOpacity,
                            }}
                        />
                    </FormControl>
                    <FormControl margin="normal" required={true} fullWidth={true}>
                        <InputLabel htmlFor="password" className={classes.label}>Password</InputLabel>
                        <Input
                            name="password"
                            type="password"
                            value={password}
                            onChange={this.handlePassword}
                            id="password"
                            autoComplete="current-password"
                            placeholder="Enter password"
                            classes={{
                                input: classes.inputOpacity,
                            }}
                        />
                    </FormControl>
                    {this.getRequire2FA()}
                    {this.getCaptcha()}
                    <Button
                        type="submit"
                        onClick={this.signIn}
                        fullWidth={true}
                        variant="outlined"
                        color="secondary"
                        className={classes.submit}
                        disabled={this.isCaptchaDisabled()}
                    >
                        Sign in
                    </Button>
                </form>
            </React.Fragment>
        );
    }

    private isCaptchaDisabled = () => {
        const { captchaType, captchaChecked } = this.props;

        return captchaType !== 'none' ? !captchaChecked : false;
    };

    private getCaptcha = () => {
        const { captchaType, classes, siteKey } = this.props;

        if (captchaType === 'none') {
            return null;
        }

        return (
            <div className={classes.captcha}>
                <ReCAPTCHA
                    sitekey={siteKey ? siteKey : 'sitekey'}
                    onChange={this.props.captchaOnChange}
                />
            </div>
        );
    };

    private getRequire2FA = () => {
        const { require2FA, classes } = this.props;

        if (require2FA) {
            return (
                <FormControl
                    margin="normal"
                    required={true}
                    fullWidth={true}
                    style={{ color: '#3598D5' }}
                >
                    <InputLabel htmlFor="otp_code" style={{ color: '#3598D5' }}>OTP code</InputLabel>
                    <Input
                        id="otp_code"
                        name="otp_code"
                        onChange={this.handleOTPCode}
                        autoFocus={true}
                        classes={{
                            input: classes.inputOpacity,
                        }}
                    />
                </FormControl>
            );
        }

        return null;
    };

    private handleEmail = e => this.props.handleChangeEmail(e);
    private handlePassword = e => this.props.handleChangePassword(e);
    private handleOTPCode = e => this.props.handleOTPCode(e);

    private signIn = e => {
        if (e) {
            e.preventDefault();
        }

        this.props.handleSignIn();
    };
}

export const LoginBox = withStyles(styles, { withTheme: true })(LoginComponent);

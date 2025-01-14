/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React, { PureComponent } from "react";
import {
	CSDButton,
	CSDButtonIcon,
} from "./WindowDecorationButton.style";

interface Props {
	variant: "minimize" | "maximize" | "restore" | "close";
}

class NativeWindowDecorationButton extends PureComponent<Props> {
	public render() {
		return (
			<CSDButton variant={this.props.variant}>
				<CSDButtonIcon />
			</CSDButton>
		);
	}
}

export default NativeWindowDecorationButton;

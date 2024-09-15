// takes info from API and outputs metrics

import {request, gql} from 'graphql-request';
import { busFactor } from "./BusFactor";
import { maintainer } from "./Maintainer";
import { rampUp } from "./rampUp";
import { license } from "./license";
import { correctness } from "./correctness";


const GITHUB_API = 'https://api.github.com/graphql';

const TOKEN = 'YOUR_GITHUB';



export class MetricManager {
    private owner: string;
    private repoName: string;

    constructor(path: string) {

        // extracts owner and repository name from the URL
        let pathParts = path.split('/').filter(Boolean);
        if (pathParts.length >= 2) {
            this.owner = pathParts[0];
            this.repoName = pathParts[1];
        } else {
            throw new Error('Invalid GitHub repository URL');
        }
    }

    getMetrics() : number {
        // get bus factor 
        const busFactorInstance = new busFactor(this.owner, this.repoName);
        const busFactorValue = busFactorInstance.getBusFactor();

        // get correctness
        const correctnessInstance = new correctness(this.owner, this.repoName);
        const correctnessValue = correctnessInstance.getCorrectness();

        // get ramp up
        const rampUpInstance = new rampUp(this.owner, this.repoName);
        const rampUpValue = rampUpInstance.getRampUp();

        // get maintainer
        const maintainerInstance = new maintainer(this.owner, this.repoName);
        const maintainerValue = maintainerInstance.getMaintainer();

        // get license
        const licenseInstance = new license(this.owner, this.repoName);
        const licenseValue = licenseInstance.getLicense();

        return (0.3 * Number(busFactorValue) + 0.2 * Number(correctnessValue) + 0.2 * Number(rampUpValue) + 0.3 * Number(maintainerValue)) * Number(licenseValue);
    }


    getOwner() : string {
        return this.owner;
    }

    getRepoName() : string {
        return this.repoName;
    }
}

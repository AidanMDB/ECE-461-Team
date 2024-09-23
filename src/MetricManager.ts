// takes info from API and outputs metrics
import { busFactor } from "./busFactor";
import { maintainer } from "./maintainer";
import { rampUp } from "./rampUp";
import { license } from "./findLicense";
import { correctness } from "./correctness";
import * as dotenv from 'dotenv';
import { performance } from 'perf_hooks';
dotenv.config();



export class MetricManager {
    private owner: string;
    private repoName: string;
    /**
     * constructs a metrics manager for a GitHub repository
     * 
     * @param path the path from the URL of the GitHub repository
     */
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

    /**
     * get metrics calls all the metric classes and returns the net score of the package
     * 
     * @returns the net score of the package
     */
    async getMetrics() : Promise<string> {
        let NetStartTime = performance.now();
        let startTime = performance.now();
        let busFactorMetric = new busFactor(this.owner, this.repoName);
        let busFactorValue = await busFactorMetric.calculateBusFactor();
        let busFactorLatency = (performance.now() - startTime) / 1000;

        startTime = performance.now();
        let rampUpMetric = new rampUp(this.owner, this.repoName);
        let rampUpValue = await rampUpMetric.getRampUpScore();
        let rampUpLatency = (performance.now() - startTime) / 1000;

        startTime = performance.now();
        let licenseMetric = new license(this.owner, this.repoName)
        let licenseValue = await licenseMetric.getRepoLicense();
        let licenseLatency = (performance.now() - startTime) / 1000;

        startTime = performance.now();
        let maintainerMetric = new maintainer(this.owner, this.repoName);
        let maintainerValue = await maintainerMetric.getMaintainerScore();
        let maintainerLatency = (performance.now() - startTime) / 1000;

        startTime = performance.now();
        let correctnessMetric = new correctness(this.owner, this.repoName);
        let correctnessValue = await correctnessMetric.getCorrectnessScore();
        let correctnessLatency = (performance.now() - startTime) / 1000;
        //console.log(`The Correctness Score is: ${correctnessValue}`);

        // Calculate the net score
        // (0.3 * busFactor + 0.2 * correctness + 0.2 * rampup + 0.3 * maintainer) * license

        let netScore = (0.3 * busFactorValue + 0.2 * correctnessValue + 0.2 * rampUpValue + 0.3 * maintainerValue) * licenseValue;
        let netLatency = (performance.now() - NetStartTime) / 1000;
        //console.log(busFactorValue);
        // parseFloat(score.toFixed(3));

        return `
        URL: 
        busFactorValue: ${parseFloat(busFactorValue.toFixed(3))} (Latency: ${busFactorLatency.toFixed(3)} s)
        rampUpValue: ${parseFloat(rampUpValue.toFixed(3))} (Latency: ${rampUpLatency.toFixed(3)} s)
        licenseValue: ${parseFloat(licenseValue.toFixed(3))} (Latency: ${licenseLatency.toFixed(3)} s)
        maintainerValue: ${parseFloat(maintainerValue.toFixed(3))} (Latency: ${maintainerLatency.toFixed(3)} s)
        correctnessValue: ${parseFloat(correctnessValue.toFixed(3))} (Latency: ${correctnessLatency.toFixed(3)} s)
        Net Score: ${parseFloat(netScore.toFixed(3))} (Latency: ${netLatency.toFixed(3)} s)
        `;

        return '\nbusFactorValue: ' + parseFloat(busFactorValue.toFixed(3)) + 
        '\n ' + 'rampUpValue: ' + parseFloat(rampUpValue.toFixed(3))
        + '\n ' + 'liscenseValue: ' + parseFloat(licenseValue.toFixed(3))
        + '\n ' + 'maintainerValue: ' + parseFloat(maintainerValue.toFixed(3))
        + '\n ' + 'correctnessValue: ' + parseFloat(correctnessValue.toFixed(3))
        + '\n ' + 'Net Score: ' + parseFloat(netScore.toFixed(3));
    }

    /**
     * getOwnwer returns the bus factor of the package
     * 
     * @returns the Owner of the package
     */
    getOwner() : string {
        return this.owner;
    }

    /**
     * getRepoName returns the repository name
     * 
     * @returns the repository name
     */
    getRepoName() : string {
        return this.repoName;
    }
}


import * as THREE from 'three'
import type { SceneManager } from './sceneManager';


export class SolarSystem {
    sceneManager !: SceneManager
    allPlanets : THREE.Mesh[] = [];
    allStars : THREE.Mesh[] = [];

    constructor(sceneManager: SceneManager) {
        this.sceneManager = sceneManager
        Array(200).fill(0).forEach(() => {
            this.addStar();
        });

        this.generatePlanetAndAnimate(0,0);
        this.generateRandomPlanets();
    }

    generatePlanetAndAnimate = (x: number, y: number) => {
        const planetGeometry = new THREE.IcosahedronGeometry(1, 3);
        const planetMaterial = new THREE.MeshStandardMaterial({
            color: 0x0077ff,
            roughness: 0.8,
            metalness: 0.3,
        });
        const planet = new THREE.Mesh(planetGeometry, planetMaterial);
        planet.position.set(x, y, 0);
        this.sceneManager.add(planet);
        this.allPlanets.push(planet)

        const ringGeometry = new THREE.TorusGeometry(1.8, 0.2, 5, 15);
        const ringMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            transparent: false,
            opacity: 0.6,
        });

        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2.5;
        ring.position.set(x, y, 0);
        this.sceneManager.add(ring);
        this.allPlanets.push(ring)
    };

    addStar = () => {
        const geometry = new THREE.SphereGeometry(0.25, 24, 24);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const star = new THREE.Mesh(geometry, material);
        const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(100));
        star.position.set(x, y, z);
        this.sceneManager.add(star);
        this.allStars.push(star);
    };

    generateRandomPlanets = () => {
        const planetColors = [
            0xb87333, // Mercury-like (rocky brown)
            0xe0c068, // Venus-like (pale yellow)
            0x3d59ab, // Earth oceans
            0xa0522d, // Mars rusty brown
            0xd2b48c, // Sandy desert planet
            0xffe5b4, // Saturn-like pale beige
            0xf4a460, // Titan-like orange
            0xc2b280, // Dusty moon color
            0x8b4513, // Deep rocky brown
            0x4682b4, // Neptune blue
            0x6495ed, // Uranus light blue
            0x708090, // Icy gray (Europa-like)
        ];
        for (const pl of planetColors) {
            const planetGeometry = new THREE.IcosahedronGeometry(Math.random() * 3, 2);
            const planetMaterial = new THREE.MeshStandardMaterial({
                color: pl,
                roughness: 0.8,
                metalness: 0.3,
            });
            const planet = new THREE.Mesh(planetGeometry, planetMaterial);
            const rmax = 50
            const rmin = -50
            const planetScale = Math.random() * 3;
            planet.position.set(Math.random() * (rmax - rmin) + rmin, Math.random() * (rmax - rmin) + rmin, Math.random() * (rmax - rmin) + rmin)
            planet.scale.set(planetScale, planetScale, planetScale);
            this.allPlanets.push(planet);
            this.sceneManager.add(planet);
        }
    }

    clear() {
        if (this.allPlanets.length > 0) this.allPlanets.forEach(item => this.sceneManager.scene.remove(item))
        if (this.allStars.length > 0) this.allStars.forEach(item => this.sceneManager.scene.remove(item));
    }


}

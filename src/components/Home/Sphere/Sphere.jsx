// noinspection CommaExpressionJS

import React, {useRef, Suspense} from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {Canvas, useFrame, useLoader} from "react-three-fiber";
import model from '../../../assets/Sphere/mars.glb'
import CameraControls from "./CameraControls";
import './styles.scss'

const Mars = () => {
    const planet = useRef();

    const { nodes } = useLoader(GLTFLoader, model);
    // model is from https://solarsystem.nasa.gov/resources/2372/mars-3d-model/
    // use GTLFLoader from three.js and useLoader hook from react-three-fiber to load model


    useFrame(() => (planet.current.rotation.y += 0.001));
    // Adds rotation to planet

    const Marker = (props) => {
        const ref = useRef()

        useFrame(() => (ref.current.rotation.y += 0.001));

        return (
            <group>
                <mesh
                    {...props}
                    ref={ref}
                    scale={1}>
                    <sphereBufferGeometry args={[100, 100, 100]} />
                    <meshStandardMaterial color={'hotpink'} />
                </mesh>
            </group>
        )
    }

    return (
        <group ref={planet}>
            <mesh
                visible={true}
                position={[0, 0, 0]}
                // Adding data from mars.glb to the geometry and material of the sphere
                geometry={nodes.Cube008.geometry}
                material={nodes.Cube008.material}>
            </mesh>
            <Marker position={[250, 250, 250]} />
        </group>

    );
};


const Sphere = () => {
    return (
        <Canvas className="canvas">
            <CameraControls />
            <directionalLight intensity={0.5} position={(0, 0, 1)}/>
            <ambientLight intensity={0.07} />
            <Suspense fallback="loading">
                <Mars />
            </Suspense>
        </Canvas>
    )
}

export default Sphere;
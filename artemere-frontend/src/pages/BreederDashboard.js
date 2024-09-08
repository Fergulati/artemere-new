import React, { useState } from 'react';
import styled from 'styled-components';

const BreederDashboard = () => {
    // State to track the selected art pieces for the left and right breeding pads
    const [leftArt, setLeftArt] = useState(null);
    const [rightArt, setRightArt] = useState(null);

    // Drag and Drop Handlers
    const handleDragStart = (e, art) => {
        e.dataTransfer.setData('art', art); // Save the art being dragged
    };

    const handleDropLeft = (e) => {
        const droppedArt = e.dataTransfer.getData('art');
        setLeftArt(droppedArt); // Set the dropped art to the left breeding pad
    };

    const handleDropRight = (e) => {
        const droppedArt = e.dataTransfer.getData('art');
        setRightArt(droppedArt); // Set the dropped art to the right breeding pad
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Allow drop by preventing default behavior
    };

    return (
        <DashboardContainer>
            {/* Left Icon Listing */}
            <Section>
                <IconList>
                    <ArtIcon
                        draggable
                        onDragStart={(e) => handleDragStart(e, 'Art 1')}
                    >
                        Art 1
                    </ArtIcon>
                    <ArtIcon
                        draggable
                        onDragStart={(e) => handleDragStart(e, 'Art 2')}
                    >
                        Art 2
                    </ArtIcon>
                    <ArtIcon
                        draggable
                        onDragStart={(e) => handleDragStart(e, 'Art 3')}
                    >
                        Art 3
                    </ArtIcon>
                </IconList>
            </Section>

            {/* Left Breeding Pad */}
            <Section
                onDrop={handleDropLeft}
                onDragOver={handleDragOver}
            >
                <BreedingPad>
                    <h3>Breeding Pad (Left)</h3>
                    <SelectedArt>{leftArt ? leftArt : 'Drop art here'}</SelectedArt>
                </BreedingPad>
            </Section>

            {/* Right Breeding Pad */}
            <Section
                onDrop={handleDropRight}
                onDragOver={handleDragOver}
            >
                <BreedingPad>
                    <h3>Breeding Pad (Right)</h3>
                    <SelectedArt>{rightArt ? rightArt : 'Drop art here'}</SelectedArt>
                </BreedingPad>
            </Section>

            {/* Right Icon Listing */}
            <Section>
                <IconList>
                    <ArtIcon
                        draggable
                        onDragStart={(e) => handleDragStart(e, 'Art A')}
                    >
                        Art A
                    </ArtIcon>
                    <ArtIcon
                        draggable
                        onDragStart={(e) => handleDragStart(e, 'Art B')}
                    >
                        Art B
                    </ArtIcon>
                    <ArtIcon
                        draggable
                        onDragStart={(e) => handleDragStart(e, 'Art C')}
                    >
                        Art C
                    </ArtIcon>
                </IconList>
            </Section>
        </DashboardContainer>
    );
};
// Dashboard container that splits the page into four vertical sections
const DashboardContainer = styled.div`
  display: flex;
  height: 100vh; /* Full height of the viewport */
`;

// Each section takes up one fourth of the width
const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-left: 1px solid #ccc;

  &:first-child {
    border-left: none;
  }
`;

// Styling for the icon list
const IconList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Space between icons */
`;

// Individual art icons in the list
const ArtIcon = styled.div`
  width: 80px;
  height: 80px;
  background-color: #eee;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #ddd;
  }
`;

// Breeding pads for left and right inner sections
const BreedingPad = styled.div`
  width: 90%;
  height: 90%;
  background-color: #fafafa;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
`;

// Selected art display inside breeding pad
const SelectedArt = styled.div`
  font-size: 18px;
  color: #333;
`;


export default BreederDashboard;

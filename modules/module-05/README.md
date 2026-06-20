# Module 5: Data Visualization and Interpretation

**Duration:** 2 weeks  
**Level:** Intermediate

## Module Overview

This module teaches students to create clear, accurate, and culturally sensitive visualizations of musical data. Students will learn design principles for presenting computational analysis results in ways that respect cultural context while effectively communicating patterns and insights.

## Learning Objectives

By the end of this module, students will be able to:

- Apply data visualization best practices to musical analysis
- Create publication-quality graphs and charts
- Design visualizations that integrate cultural context
- Choose appropriate visualization types for different data
- Critique visualizations for accuracy and cultural sensitivity
- Present complex computational results to diverse audiences

## Key Concepts

### Visualization Principles
- **Clarity:** Clear labels, legends, and titles
- **Accuracy:** Honest representation of data
- **Context:** Cultural and analytical framing
- **Accessibility:** Readable colors, fonts, and layout
- **Purpose:** Each visualization should answer a specific question

### Types of Visualizations
- **Time-series plots:** Waveforms, feature evolution
- **Spectrograms:** Time-frequency representations
- **Scatter plots:** PCA, embeddings, clustering
- **Bar charts and histograms:** Feature distributions
- **Heatmaps:** Multi-dimensional comparisons
- **Network graphs:** Relationships and connections

### Cultural Sensitivity in Visualization
- Avoiding stereotypes in color choices and imagery
- Proper attribution and context
- Respectful representation of traditions
- Community input and collaboration
- Transparency about data sources and methods

## Key Activities

### Week 1: Visualization Fundamentals

**Activity 5.1: Critique Gallery**
- Analyze example visualizations (good and poor)
- Identify strengths and weaknesses
- Discuss cultural sensitivity issues
- Create evaluation rubric

**Activity 5.2: Redesign Challenge**
- Take poorly designed visualization from research
- Redesign for clarity and accuracy
- Add cultural context elements
- Present before/after comparisons

**Activity 5.3: Color and Design**
- Learn about color theory and accessibility
- Explore culturally appropriate color choices
- Practice creating consistent visual themes
- Test visualizations for colorblind accessibility

### Week 2: Creating Research Visualizations

**Activity 5.4: Building a Visualization Portfolio**
- Select 4-5 key findings from previous modules
- Design custom visualizations for each
- Add annotations, captions, and context
- Create a cohesive visual style

**Activity 5.5: Infographic Design**
- Synthesize complex analysis into accessible infographic
- Combine multiple data types (audio, cultural, computational)
- Design for public audience
- Include narrative elements

**Activity 5.6: Interactive Visualization**
- Explore tools for interactive data (Plotly, D3.js, Bokeh)
- Create simple interactive plot
- Consider when interactivity adds value
- Optional: web-based visualization

## Assessment

### Visualization Portfolio (100%)

Create a portfolio of 5-7 visualizations with supporting documentation:

**Required Components:**

1. **Waveform or Spectrogram (15%)**
   - Clear time-frequency representation
   - Annotated to highlight musical features
   - Cultural context in caption

2. **Feature Comparison (15%)**
   - Bar chart, histogram, or box plot
   - Comparing Baboon Dance with another tradition
   - Statistical annotations (means, ranges)

3. **PCA or Clustering Visualization (20%)**
   - 2D scatter plot with labeled clusters
   - Explained variance noted
   - Color coding with legend
   - Interpretation guide

4. **Embedding Fingerprint (15%)**
   - Mean embeddings of two traditions overlaid
   - Highlighted regions of difference
   - Connection to sonic features

5. **Infographic (20%)**
   - Synthesizes multiple findings
   - Designed for public/educational audience
   - Combines data, images, and narrative
   - Culturally respectful presentation

6. **Choice Visualization (10%)**
   - Student's choice of data/format
   - Demonstrates creativity and skill
   - Addresses interesting question

7. **Documentation (5%)**
   - Description of design choices
   - Tools and methods used
   - Reflection on challenges and learnings

**Assessment Criteria:**
- Visual clarity and professional quality
- Accuracy of data representation
- Effective use of color, typography, and layout
- Cultural sensitivity and appropriate context
- Creativity and originality
- Technical execution

## Required Materials

### Software and Tools
- Python: Matplotlib, Seaborn, Plotly
- Design tools: Canva, Adobe Illustrator, Inkscape, or similar
- Optional: Tableau, D3.js, Observable

### Resources
- [Visualization Best Practices Guide](../../resources/guides/visualization-guide.md)
- Color palette resources
- Example gallery of effective music visualizations

## Code Examples

### Example 1: Professional Spectrogram

```python
import librosa
import librosa.display
import matplotlib.pyplot as plt
import numpy as np

# Load audio
y, sr = librosa.load('baboon_dance.wav')

# Create spectrogram
D = librosa.stft(y)
S_db = librosa.amplitude_to_db(np.abs(D), ref=np.max)

# Create figure with custom styling
fig, ax = plt.subplots(figsize=(12, 6))
img = librosa.display.specshow(S_db, sr=sr, x_axis='time', y_axis='hz', 
                                ax=ax, cmap='viridis')

# Add colorbar with label
cbar = fig.colorbar(img, ax=ax, format='%+2.0f dB')
cbar.set_label('Amplitude (dB)', rotation=270, labelpad=15)

# Title and labels
ax.set_title('Baboon Dance Spectrogram - Ritual Performance\nGuyana, 2024', 
             fontsize=14, pad=20)
ax.set_xlabel('Time (seconds)', fontsize=12)
ax.set_ylabel('Frequency (Hz)', fontsize=12)

# Add grid for readability
ax.grid(alpha=0.2, linestyle='--')

plt.tight_layout()
plt.savefig('baboon_dance_spectrogram.png', dpi=300, bbox_inches='tight')
plt.show()
```

### Example 2: Comparative Feature Plot

```python
import seaborn as sns
import pandas as pd

# Prepare data
data = pd.DataFrame({
    'Tradition': ['Baboon Dance']*50 + ['Inti Raymi']*50,
    'Tempo': baboon_tempos + inti_tempos,
    'Spectral Centroid': baboon_centroids + inti_centroids
})

# Create styled comparison plot
sns.set_style('whitegrid')
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Tempo comparison
sns.boxplot(data=data, x='Tradition', y='Tempo', ax=axes[0], 
            palette=['#E74C3C', '#3498DB'])
axes[0].set_title('Tempo Comparison', fontsize=14, fontweight='bold')
axes[0].set_ylabel('Beats per Minute (BPM)', fontsize=11)

# Spectral centroid comparison
sns.violinplot(data=data, x='Tradition', y='Spectral Centroid', 
               ax=axes[1], palette=['#E74C3C', '#3498DB'])
axes[1].set_title('Spectral Centroid ("Brightness")', fontsize=14, fontweight='bold')
axes[1].set_ylabel('Frequency (Hz)', fontsize=11)

plt.suptitle('Musical Feature Comparison: Two Indigenous Traditions', 
             fontsize=16, fontweight='bold', y=1.02)
plt.tight_layout()
plt.savefig('feature_comparison.png', dpi=300, bbox_inches='tight')
plt.show()
```

### Example 3: Annotated PCA with Cultural Context

```python
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

# Perform PCA
pca = PCA(n_components=2)
embeddings_2d = pca.fit_transform(all_embeddings)

# Create publication-quality plot
fig, ax = plt.subplots(figsize=(12, 9))

# Plot each tradition with distinct styling
traditions = {
    'Baboon Dance': {'color': '#E74C3C', 'marker': 'o'},
    'Inti Raymi': {'color': '#3498DB', 'marker': 's'}
}

for tradition, style in traditions.items():
    mask = [l == tradition for l in labels]
    ax.scatter(embeddings_2d[mask, 0], embeddings_2d[mask, 1],
              c=style['color'], marker=style['marker'], 
              label=tradition, alpha=0.6, s=50, edgecolors='white', linewidth=0.5)

# Add labels and title
var1, var2 = pca.explained_variance_ratio_
ax.set_xlabel(f'Principal Component 1 ({var1:.1%} of variance)', fontsize=12)
ax.set_ylabel(f'Principal Component 2 ({var2:.1%} of variance)', fontsize=12)
ax.set_title('Audio Embedding Space: Comparing Indigenous Ritual Traditions\n' +
             'Baboon Dance (Guyana) vs. Festival of the Sun (Peru, Quechua)',
             fontsize=14, fontweight='bold', pad=20)

# Legend and grid
ax.legend(fontsize=11, frameon=True, shadow=True, loc='upper right')
ax.grid(alpha=0.3, linestyle='--')

# Add explanatory note
fig.text(0.5, -0.05, 
         'Each point represents a 1-second audio segment. Clustering indicates sonic similarity.\n' +
         'Generated using OpenL3 audio embeddings and Principal Component Analysis.',
         ha='center', fontsize=10, style='italic', color='gray')

plt.tight_layout()
plt.savefig('pca_comparison_annotated.png', dpi=300, bbox_inches='tight')
plt.show()
```

## Additional Resources

### Design Guides
- Edward Tufte's principles of information design
- Color accessibility guidelines (WCAG)
- Typography for data visualization

### Inspiration Galleries
- Information is Beautiful awards
- Scientific visualization examples
- Cultural heritage digital projects

### Tools and Libraries
- [Seaborn Gallery](https://seaborn.pydata.org/examples/index.html)
- [Plotly Documentation](https://plotly.com/python/)
- [ColorBrewer](https://colorbrewer2.org/) - color schemes for maps/charts

## Instructor Notes

### Teaching Strategies
- Show both excellent and flawed examples
- Encourage iteration—first drafts are rarely final
- Provide templates and starter code
- Emphasize that good visualization takes time
- Invite feedback from peers and community members

### Common Mistakes
- Over-complicated visualizations trying to show too much
- Poor color choices (clashing, inaccessible, culturally insensitive)
- Missing labels, legends, or context
- Chart types that don't match data (e.g., pie charts for comparisons)
- Visualization without interpretation

### Assessment Tips
- Provide clear rubric before assignment
- Allow revisions based on feedback
- Consider portfolio presentation/defense
- Value process documentation alongside final products

## Connection to Next Module

Module 6 will address the broader context of digital archiving and preservation. Students will learn how their analytical work can contribute to long-term cultural heritage preservation, including proper metadata, documentation, and ethical archiving practices.

---

[← Back: Module 4](../module-04/README.md) | [Next: Module 6 →](../module-06/README.md)

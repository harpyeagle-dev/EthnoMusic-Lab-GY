# Module 3: Machine Learning for Audio

**Duration:** 3-4 weeks  
**Level:** Intermediate to Advanced

## Module Overview

This module introduces students to machine learning approaches for audio analysis, focusing on audio embeddings and deep learning models. Students will learn how neural networks can automatically learn high-level representations of music, enabling sophisticated pattern recognition and comparative analysis across cultural traditions.

## Learning Objectives

By the end of this module, students will be able to:

- Understand the basics of machine learning and neural networks
- Use pre-trained models (OpenL3) to generate audio embeddings
- Apply dimensionality reduction techniques (PCA, t-SNE)
- Visualize high-dimensional audio data
- Compare musical traditions using embedding-based analysis
- Critically evaluate what machine learning can and cannot capture about music

## Key Concepts

### Machine Learning Basics
- **Supervised vs. Unsupervised Learning:** Different ML paradigms
- **Neural Networks:** Layers, weights, and learning
- **Transfer Learning:** Using pre-trained models
- **Features vs. Embeddings:** Hand-crafted vs. learned representations

### Audio Embeddings
- **OpenL3:** Pre-trained audio embedding model
- **Embedding Space:** High-dimensional representation of sound
- **Semantic Similarity:** Similar sounds cluster together
- **Dimensionality:** 512-D vectors capturing complex audio features

### Dimensionality Reduction
- **Principal Component Analysis (PCA):** Linear projection to lower dimensions
- **t-SNE:** Non-linear visualization technique
- **Clustering:** Grouping similar audio segments

## Key Activities

### Week 1: Introduction to Machine Learning

**Activity 3.1: ML Concepts and Audio**
- Interactive introduction to neural networks
- Explore how machines "learn" patterns
- Discuss applications in music analysis
- Watch demonstrations of audio ML systems

**Activity 3.2: Installing and Using OpenL3**
- Set up OpenL3 library
- Generate embeddings from Baboon Dance audio
- Understand embedding structure (512-D vectors)
- Visualize embedding dimensions

### Week 2: Embedding Analysis

**Activity 3.3: Creating Audio Fingerprints**
- Extract embeddings from multiple Baboon Dance recordings
- Calculate mean embedding "fingerprint" for the tradition
- Compare fingerprints across different performances
- Use [Worksheet #4](../../worksheets/worksheet-04.md)

**Activity 3.4: Dimensionality Reduction with PCA**
- Apply PCA to reduce embeddings to 2D
- Create scatter plots showing audio segments
- Identify clusters and patterns
- Interpret principal components

### Week 3: Comparative Analysis

**Activity 3.5: Cross-Cultural Comparison**
- Generate embeddings for Festival of the Sun (Inti Raymi) recordings
- Create combined PCA visualization
- Analyze separation vs. overlap between traditions
- Use [Worksheet #5](../../worksheets/worksheet-05.md)

**Activity 3.6: Clustering and Classification**
- Apply k-means clustering to embeddings
- Evaluate how well algorithms distinguish traditions
- Discuss what features drive separation
- Consider limitations of computational classification

### Week 4: Critical Evaluation

**Activity 3.7: What Can ML Capture?**
- Compare ML results with cultural knowledge
- Identify what embeddings capture (rhythm, timbre) vs. miss (meaning, context)
- Discuss ethical implications of automating cultural analysis
- Debate: "Can AI understand music?"

## Assessment

### Technical Report: Audio Embeddings Analysis (100%)

Submit a comprehensive report (2000-2500 words) including:

**Part 1: Methodology (25%)**
- Explanation of OpenL3 and how it works
- Description of PCA and visualization approach
- Technical parameters and choices
- Code documentation

**Part 2: Results (35%)**
- Mean embedding fingerprints for Baboon Dance and comparison tradition
- PCA visualization with labeled clusters
- Statistical analysis (distances, variance explained)
- At least 4 high-quality visualizations

**Part 3: Interpretation (30%)**
- What patterns emerge from the embeddings?
- How do traditions separate or overlap?
- What musical features might explain the patterns?
- Cultural context for observed differences

**Part 4: Critical Reflection (10%)**
- Strengths and limitations of ML for cultural analysis
- What is lost in computational reduction?
- Ethical considerations
- Future directions

**Deliverables:**
- Written report with embedded visualizations
- Jupyter Notebook with annotated code
- Generated embedding files (.npy format)

## Required Materials

### Software
- Python 3.8+
- OpenL3 library
- scikit-learn (for PCA, clustering)
- Matplotlib, Seaborn (visualization)

### Datasets
- Baboon Dance audio files
- Festival of the Sun (Inti Raymi) audio files
- Pre-computed embeddings (optional backup)

### Worksheets
- [Worksheet #4: Understanding Embeddings](../../worksheets/worksheet-04.md)
- [Worksheet #5: PCA Interpretation](../../worksheets/worksheet-05.md)

## Code Examples

### Example 1: Generating OpenL3 Embeddings

```python
import openl3
import soundfile as sf
import numpy as np

# Load audio
audio, sr = sf.read('baboon_dance.wav')

# Generate embeddings
embeddings, timestamps = openl3.get_audio_embedding(
    audio, sr, 
    content_type='music',
    embedding_size=512
)

print(f"Embedding shape: {embeddings.shape}")
print(f"Each window produces a 512-dimensional vector")
```

### Example 2: Mean Embedding Fingerprint

```python
import matplotlib.pyplot as plt

# Calculate mean embedding across all windows
mean_embedding = np.mean(embeddings, axis=0)

# Visualize fingerprint
plt.figure(figsize=(15, 4))
plt.plot(mean_embedding, linewidth=0.8)
plt.title("Mean Embedding Fingerprint - Baboon Dance")
plt.xlabel("Embedding Dimension")
plt.ylabel("Activation Value")
plt.grid(alpha=0.3)
plt.tight_layout()
plt.show()
```

### Example 3: PCA Visualization

```python
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

# Combine embeddings from both traditions
# Assume baboon_embeddings and inti_embeddings are loaded

all_embeddings = np.vstack([baboon_embeddings, inti_embeddings])
labels = ['Baboon Dance'] * len(baboon_embeddings) + \
         ['Inti Raymi'] * len(inti_embeddings)

# Apply PCA
pca = PCA(n_components=2)
embeddings_2d = pca.fit_transform(all_embeddings)

# Visualize
plt.figure(figsize=(10, 8))
for label in set(labels):
    mask = [l == label for l in labels]
    plt.scatter(embeddings_2d[mask, 0], 
                embeddings_2d[mask, 1],
                label=label, alpha=0.6, s=20)

plt.xlabel(f'PC1 ({pca.explained_variance_ratio_[0]:.1%} variance)')
plt.ylabel(f'PC2 ({pca.explained_variance_ratio_[1]:.1%} variance)')
plt.title('PCA of Audio Embeddings')
plt.legend()
plt.grid(alpha=0.3)
plt.tight_layout()
plt.show()
```

## Additional Resources

### Readings
- Cramer et al. "Look, Listen and Learn More: Design Choices for Deep Audio Embeddings"
- McFee et al. "Open-Source Practices for Music Signal Processing Research"
- Articles on music information retrieval and ML

### Tutorials
- [OpenL3 Documentation](https://openl3.readthedocs.io/)
- [Understanding PCA](../../resources/tutorials/pca-explained.md)
- [Machine Learning for Audio](../../resources/tutorials/ml-audio.md)

### Online Resources
- Google's Magenta project for music and ML
- ISMIR (International Society for Music Information Retrieval) papers

## Instructor Notes

### Teaching Strategies
- Use visual metaphors to explain high-dimensional spaces
- Demonstrate embedding generation live in class
- Encourage experimentation with different audio samples
- Balance technical depth with conceptual understanding
- Address "black box" concerns about neural networks

### Common Challenges
- **Abstract concepts:** Embeddings are hard to visualize—use analogies
- **Computational resources:** OpenL3 can be slow—consider pre-computing some embeddings
- **Over-interpretation:** Remind students that patterns aren't explanations
- **Technical jargon:** Build glossary and review terms regularly

### Discussion Prompts
- "What does it mean for two sounds to be 'similar' in embedding space?"
- "Can a computer understand cultural significance?"
- "What are the risks of using ML to classify Indigenous music?"
- "How might embedding-based analysis support or harm cultural preservation?"

## Connection to Next Module

Module 4 will apply these ML techniques to conduct systematic comparative ethnomusicology, examining multiple Indigenous traditions. Students will use the tools from this module to explore both similarities and unique characteristics across cultures.

---

[← Back: Module 2](../module-02/README.md) | [Next: Module 4 →](../module-04/README.md)
